import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma, TeamMemberRole } from "@abuse-sleuth/prisma";

import { trpc } from "../../initTRPC";

export const requiredTeamRoleMiddleware = (allowedRoles: TeamMemberRole[]) => {
    return trpc.middleware(async ({ ctx, next, rawInput }) => {
        const shape = z.object({
            teamId: z.string(),
        });

        const result = shape.safeParse(rawInput);

        if (!result.success) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Input missing: 'teamId'",
            });
        }

        const { teamId } = result.data;

        const userInTeam = await prisma.userOnTeam.findFirst({
            where: {
                userId: ctx.user?.id,
                teamId: teamId,
            },
        });

        if (!userInTeam) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "User Doesn't Belong in this Team",
            });
        }

        if (!allowedRoles.includes(userInTeam.role)) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: `User Isn't a Team Roles: '${allowedRoles.join(
                    ", "
                )}'`,
            });
        }

        return next();
    });
};
