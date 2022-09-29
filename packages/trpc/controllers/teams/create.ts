import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";
import stripe, { Stripe } from "@abuse-sleuth/stripe";

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

        const stripeSub = await stripe.subscriptions.create({
            customer: opts.ctx.user?.stripeCustomerId as string,
            items: [
                {
                    price: (sortedProducts[0].default_price as Stripe.Price).id,
                },
            ],
        });

        const team = await prisma.team.create({
            data: {
                teamName: opts.input.teamName,
                stripeSubId: stripeSub.id,
                users: {
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

        return team;
    });

export default createController;
