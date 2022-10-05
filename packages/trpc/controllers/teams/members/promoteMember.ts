import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";

import { requiredTeamRoleMiddleware } from "../../../middlewares/teams/requiredTeamRoleMiddleware";
import { requireLoggedInProcedure } from "../../../procedures/requireLoggedInProcedure";

export const promoteMemberController = requireLoggedInProcedure
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

        const teamMember = await prisma.teamMember.findUnique({
            where: {
                userId_teamId: {
                    teamId: opts.input.teamId,
                    userId: user.id,
                },
            },
        });

        if (!teamMember) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "User Email doesn't exist",
            });
        }

        if (teamMember.role === "MANAGER") {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "User on Team is Already a Manager",
            });
        }

        return await prisma.teamMember.update({
            where: {
                userId_teamId: {
                    teamId: opts.input.teamId,
                    userId: user.id,
                },
            },
            data: {
                role: "MANAGER",
            },
        });
    });

export default promoteMemberController;
