import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma, Team } from "@abuse-sleuth/prisma";

import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";

export const setActiveTeamSelfController = requireLoggedInProcedure
    .input(
        z.object({
            teamId: z.string(),
        })
    )
    .mutation(async (opts) => {
        // Check if User is apart of team
        const userOnTeam = await prisma.userOnTeam.findFirstOrThrow({
            where: {
                userId: opts.ctx.user?.id,
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
                id: opts.ctx.user?.id,
            },
        });

        return userOnTeam.team as Team;
    });

export default setActiveTeamSelfController;
