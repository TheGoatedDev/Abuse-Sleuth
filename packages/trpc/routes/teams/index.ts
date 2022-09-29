import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";
import stripe, { Stripe } from "@abuse-sleuth/stripe";

import { trpc } from "../../initTRPC";
import { requiredTeamRole } from "../../middlewares/requiredTeamRole";
import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";
import { teamsMemberRouter } from "./member";

export const teamsRouter = trpc.router({
    member: teamsMemberRouter,

    getSelfAllTeam: requireLoggedInProcedure.query(async (opts) => {
        const teams = await prisma.team.findMany({
            where: {
                users: {
                    some: {
                        user: {
                            id: opts.ctx.user?.id,
                        },
                    },
                },
            },
        });

        return teams;
    }),

    getTeam: requireLoggedInProcedure
        .use(requiredTeamRole(["USER", "MANAGER", "OWNER"]))
        .input(
            z.object({
                teamId: z.string(),
            })
        )
        .query(async (opts) => {
            const team = await prisma.team.findFirstOrThrow({
                where: {
                    id: opts.input.teamId,
                    users: {
                        some: {
                            user: {
                                id: opts.ctx.user?.id,
                            },
                        },
                    },
                },
            });

            return team;
        }),

    getSelfActiveTeam: requireLoggedInProcedure.query(async (opts) => {
        const userWithActiveTeam = await prisma.user.findUniqueOrThrow({
            where: {
                id: opts.ctx.user?.id,
            },
            include: {
                activeTeam: true,
            },
        });

        return userWithActiveTeam?.activeTeam;
    }),

    createNewTeam: requireLoggedInProcedure
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

            const sortedProducts = stripeProducts.data.sort((a, b) => {
                const aPrice = a.default_price as Stripe.Price;
                const bPrice = b.default_price as Stripe.Price;

                return (aPrice.unit_amount ?? 0) - (bPrice.unit_amount ?? 0);
            });

            const stripeSub = await stripe.subscriptions.create({
                customer: opts.ctx.user?.stripeCustomerId as string,
                items: [
                    {
                        price: (sortedProducts[0].default_price as Stripe.Price)
                            .id,
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
        }),
});
