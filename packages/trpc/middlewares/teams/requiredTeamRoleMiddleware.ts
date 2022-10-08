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

        try {
            const userInTeam = await prisma.teamMember.findUniqueOrThrow({
                where: {
                    userId_teamId: {
                        teamId: teamId,
                        userId: ctx.user?.id ?? "",
                    },
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
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "ERROR IN TEAMROLEMIDDLEWARE",
            });
        }

        return next();
    });
};
