import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";
import stripe from "@abuse-sleuth/stripe";
import { Stripe } from "@abuse-sleuth/stripe/Stripe";

import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";

export const createController = requireLoggedInProcedure
    .input(
        z.object({
            teamName: z.string(),
        })
    )
    .mutation(async (opts) => {
        const stripeProducts = await stripe.products.list({
            active: true,
            expand: ["data.default_price"],
        });

        // TODO: Migrate this to Stripe Package
        const sortedProducts = stripeProducts.data.sort((a, b) => {
            const aPrice = a.default_price as Stripe.Price;
            const bPrice = b.default_price as Stripe.Price;

            return (aPrice.unit_amount ?? 0) - (bPrice.unit_amount ?? 0);
        });

        const team = await prisma.team.create({
            data: {
                teamName: opts.input.teamName,
                members: {
                    create: {
                        role: "OWNER",
                        user: {
                            connect: {
                                id: opts.ctx.user?.id as string,
                            },
                        },
                    },
                },
            },
        });

        await stripe.subscriptions.create({
            customer: opts.ctx.user?.stripeCustomerId as string,
            items: [
                {
                    price: (sortedProducts[0].default_price as Stripe.Price).id,
                },
            ],
            metadata: {
                teamId: team.id,
            },
        });

        return team;
    });

export default createController;
