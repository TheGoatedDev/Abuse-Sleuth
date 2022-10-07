import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";
import stripe from "@abuse-sleuth/stripe";
import { Stripe } from "@abuse-sleuth/stripe/Stripe";

import { trpc } from "../../initTRPC";
import getSortedProducts from "../../services/stripe/getSortedProducts";

export const processWebhookController = trpc.procedure
    .input(
        z.object({
            bufferString: z.string(),
            signature: z.string(),
        })
    )
    .mutation(async ({ input, ctx }) => {
        const StripeWebhookSecret = process.env["STRIPE_WEBHOOK_SECRET"]!;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                input.bufferString,
                input.signature,
                StripeWebhookSecret
            );
        } catch (error) {
            const errorMessage =
                error instanceof Stripe.errors.StripeSignatureVerificationError
                    ? error.message
                    : "Unknown Error";
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: errorMessage,
            });
        }

        // TODO: FIX THIS IT BROKE AF
        switch (event.type) {
            case "customer.subscription.created":
                const createdSubscription = event.data
                    .object as Stripe.Subscription;
                try {
                    let createdSubTeamId =
                        createdSubscription.metadata["teamId"];

                    const team = await prisma.team.findUniqueOrThrow({
                        where: {
                            id: createdSubTeamId,
                        },
                    });

                    // Only Adds Stripe Subscription to Team if no exist Subscription
                    if (
                        team.stripeSubId === null &&
                        createdSubscription.status === "active"
                    ) {
                        await prisma.team.update({
                            where: { id: createdSubTeamId },
                            data: {
                                stripeSubId: createdSubscription.id,
                            },
                        });
                        return;
                    }

                    // Removes Old Subscription and Add New to Team
                    if (team.stripeSubId) {
                        await stripe.subscriptions.del(team.stripeSubId);

                        await prisma.team.update({
                            where: { id: createdSubTeamId },
                            data: {
                                stripeSubId: createdSubscription.id,
                            },
                        });
                        return;
                    }
                } catch (error) {
                    // If anything fails, to delete the created Subscription
                    await stripe.subscriptions.del(createdSubscription.id);
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message:
                            "Error in: customer.subscription.created, Deleting Subscription",
                    });
                }

            case "customer.subscription.updated":
                const updatedSubscription = event.data
                    .object as Stripe.Subscription;
                let updatedSubteamId = updatedSubscription.metadata["teamId"];

                if (updatedSubscription.status !== "active") {
                    // Lock and Block Team
                    return;
                }

                break;

            case "customer.subscription.deleted":
                const deletedSubscription = event.data
                    .object as Stripe.Subscription;
                let deletedSubTeamId = deletedSubscription.metadata["teamId"];

                const products = await getSortedProducts();

                // Stops if this is the Free Product
                if (
                    deletedSubscription.items.data[0].price.id ===
                    (products[0].default_price as Stripe.Price).id
                ) {
                    return;
                }

                // Creates New Free Plan
                await stripe.subscriptions.create({
                    customer: deletedSubscription.customer.toString(),
                    items: [
                        {
                            price: (products[0].default_price as Stripe.Price)
                                .id,
                        },
                    ],
                    metadata: {
                        teamId: deletedSubTeamId,
                    },
                });

                break;

            default:
                break;
        }
    });

export default processWebhookController;
