import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { Prisma, prisma } from "@abuse-sleuth/prisma";

import { requiredTeamRoleMiddleware } from "../../../middlewares/teams/requiredTeamRoleMiddleware";
import { requireLoggedInProcedure } from "../../../procedures/requireLoggedInProcedure";

export const removeMemberController = requireLoggedInProcedure
    .use(requiredTeamRoleMiddleware(["MANAGER", "OWNER"]))
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

        const userOnTeam = await prisma.teamMember.findUniqueOrThrow({
            where: {
                userId_teamId: {
                    teamId: opts.input.teamId,
                    userId: user.id,
                },
            },
        });

        if (!userOnTeam) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "User doesn't exist on Team",
            });
        }

        if (userOnTeam.role === "OWNER") {
            throw new TRPCError({
                code: "FORBIDDEN",
                message: "Can't remove the Owner of the Team",
            });
        }

        try {
            const results = await prisma.teamMember.delete({
                where: {
                    userId_teamId: {
                        teamId: opts.input.teamId,
                        userId: user.id,
                    },
                },
            });

            return true;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: error.message,
                });
            }
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: JSON.stringify(error),
            });
        }
    });

export default removeMemberController;
