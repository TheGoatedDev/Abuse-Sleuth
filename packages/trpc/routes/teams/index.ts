import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";
import stripe, { Stripe } from "@abuse-sleuth/stripe";

import { trpc } from "../../initTRPC";

export const teamsRouter = trpc.router({
    getSelfAllTeam: trpc.procedure.query(async (opts) => {
        if (!opts.ctx.session) {
            throw new TRPCError({
                message: "No User Session Found",
                code: "UNAUTHORIZED",
            });
        }

        const teams = await prisma.team.findMany({
            where: {
                users: {
                    some: {
                        user: {
                            id: opts.ctx.session.user?.id,
                        },
                    },
                },
            },
        });

        return teams
    }),

    getSelfTeam: trpc.procedure
        .input(
            z.object({
                teamId: z.string(),
            })
        )
        .query(async (opts) => {
            if (!opts.ctx.session) {
                throw new TRPCError({
                    message: "No User Session Found",
                    code: "UNAUTHORIZED",
                });
            }

            const team = await prisma.team.findFirstOrThrow({
                where: {
                    id: opts.input.teamId,
                    users: {
                        some: {
                            user: {
                                id: opts.ctx.session.user?.id,
                            },
                        },
                    },
                },
            });

            return team
        }),

    getSelfActiveTeam: trpc.procedure.query(async (opts) => {
        if (!opts.ctx.session) {
            throw new TRPCError({
                message: "No User Session Found",
                code: "UNAUTHORIZED",
            });
        }

        const userWithActiveTeam = await prisma.user.findUnique({
            where: {
                id: opts.ctx.session.user?.id,
            },
            include: {
                activeTeam: true,
            },
        });

        return userWithActiveTeam?.activeTeam;
    }),

    createNewTeam: trpc.procedure
        .input(
            z.object({
                teamName: z.string(),
            })
        )
        .mutation(async (opts) => {
            if (!opts.ctx.session || !opts.ctx.session.user) {
                throw new TRPCError({
                    message: "No User Session Found",
                    code: "UNAUTHORIZED",
                });
            }

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
                customer: opts.ctx.session.user.stripeCustomerId as string,
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
                                    id: opts.ctx.session.user.id as string,
                                },
                            },
                        },
                    },
                },
            });

            return team;
        }),
});
