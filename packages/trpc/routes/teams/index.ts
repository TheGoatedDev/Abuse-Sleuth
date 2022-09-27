import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { Prisma, prisma } from "@abuse-sleuth/prisma";
import stripe, { Stripe } from "@abuse-sleuth/stripe";

import { trpc } from "../../initTRPC";
import { requiredTeamRole } from "../../middlewares/requiredTeamRole";
import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";

export const teamsRouter = trpc.router({
    getSelfAllTeam: requireLoggedInProcedure.query(async (opts) => {
        const teams = await prisma.team.findMany({
            where: {
                users: {
                    some: {
                        user: {
                            id: opts.ctx.session?.user?.id,
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
                                id: opts.ctx.session?.user?.id,
                            },
                        },
                    },
                },
            });

            return team;
        }),

    getTeamMembers: requireLoggedInProcedure
        .use(requiredTeamRole(["USER", "MANAGER", "OWNER"]))
        .input(
            z.object({
                teamId: z.string(),
            })
        )
        .query(async (opts) => {
            const teamMembers = await prisma.userOnTeam.findMany({
                where: {
                    teamId: opts.input.teamId,
                },
                include: {
                    user: true,
                },
            });

            return teamMembers;
        }),

    getSelfActiveTeam: requireLoggedInProcedure.query(async (opts) => {
        const userWithActiveTeam = await prisma.user.findUniqueOrThrow({
            where: {
                id: opts.ctx.session?.user?.id,
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
                customer: opts.ctx.session?.user?.stripeCustomerId as string,
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
                                    id: opts.ctx.session?.user?.id as string,
                                },
                            },
                        },
                    },
                },
            });

            return team;
        }),

    addUserToTeam: requireLoggedInProcedure
        .use(requiredTeamRole(["MANAGER", "OWNER"]))
        .input(
            z.object({
                teamId: z.string(),
                userEmail: z.string().email(),
            })
        )
        .mutation(async (opts) => {
            // Check if User Exists
            const user = await prisma.user.findUnique({
                where: {
                    email: opts.input.userEmail,
                },
            });

            if (!user) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User Email doesn't exist",
                });
            }

            try {
                const userOnTeam = await prisma.userOnTeam.create({
                    data: {
                        role: "USER",
                        user: {
                            connect: {
                                email: opts.input.userEmail,
                            },
                        },
                        team: {
                            connect: {
                                id: opts.input.teamId,
                            },
                        },
                    },
                });

                return userOnTeam;
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === "P2002") {
                        throw new TRPCError({
                            code: "BAD_REQUEST",
                            message: "This User is Already apart of this Team",
                        });
                    }

                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: error.message,
                    });
                }

                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Ummmmm IDK What Happened here...",
                });
            }
        }),
});
