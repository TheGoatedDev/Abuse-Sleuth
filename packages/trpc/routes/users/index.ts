import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma, Team } from "@abuse-sleuth/prisma";
import stripe from "@abuse-sleuth/stripe";

import { trpc } from "../../initTRPC";

export const usersRouter = trpc.router({
    getSelf: trpc.procedure.query((opts) => {
        if (!opts.ctx.session) {
            throw new TRPCError({
                message: "No User Session Found",
                code: "UNAUTHORIZED",
            });
        }

        return prisma.user.findFirst({
            where: {
                id: opts.ctx.session.user?.id,
            },
        });
    }),

    getBillingPortal: trpc.procedure.query(async (opts) => {
        if (!opts.ctx.session) {
            throw new TRPCError({
                message: "No User Session Found",
                code: "UNAUTHORIZED",
            });
        }

        const user = await prisma.user.findFirst({
            where: {
                id: opts.ctx.session.user?.id,
            },
        });

        const session = await stripe.billingPortal.sessions.create({
            customer: user?.stripeCustomerId ?? "",
        });

        return session.url;
    }),

    setActiveTeam: trpc.procedure
        .input(
            z.object({
                teamId: z.string(),
            })
        )
        .mutation(async (opts) => {
            if (!opts.ctx.session) {
                throw new TRPCError({
                    message: "No User Session Found",
                    code: "UNAUTHORIZED",
                });
            }

            // Check if User is apart of team
            const userOnTeam = await prisma.userOnTeam.findFirst({
                where: {
                    userId: opts.ctx.session.user?.id,
                    teamId: opts.input.teamId,
                },
                include: {
                    team: true,
                },
            });

            if (!userOnTeam) {
                throw new TRPCError({
                    message: "User and TeamId don't exist",
                    code: "UNAUTHORIZED",
                });
            }

            await prisma.user.update({
                data: {
                    activeTeamId: opts.input.teamId,
                },
                where: {
                    id: opts.ctx.session.user?.id,
                },
            });

            return userOnTeam.team as Team;
        }),
});
