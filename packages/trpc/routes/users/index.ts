import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma, Team } from "@abuse-sleuth/prisma";
import stripe from "@abuse-sleuth/stripe";

import { trpc } from "../../initTRPC";
import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";

export const usersRouter = trpc.router({
    getSelf: requireLoggedInProcedure.query((opts) => {
        return prisma.user.findFirstOrThrow({
            where: {
                id: opts.ctx.session.user.id,
            },
        });
    }),

    getBillingPortal: requireLoggedInProcedure.query(async (opts) => {
        const session = await stripe.billingPortal.sessions.create({
            customer: opts.ctx.session.user.stripeCustomerId ?? "",
        });

        return session.url;
    }),

    setActiveTeam: requireLoggedInProcedure
        .input(
            z.object({
                teamId: z.string(),
            })
        )
        .mutation(async (opts) => {
            // Check if User is apart of team
            const userOnTeam = await prisma.userOnTeam.findFirstOrThrow({
                where: {
                    userId: opts.ctx.session.user.id,
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
                    id: opts.ctx.session.user.id,
                },
            });

            return userOnTeam.team as Team;
        }),
});
