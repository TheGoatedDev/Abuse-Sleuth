import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { Prisma, prisma } from "@abuse-sleuth/prisma";

import { trpc } from "../../../initTRPC";
import { requiredTeamRole } from "../../../middlewares/requiredTeamRole";
import { requireLoggedInProcedure } from "../../../procedures/requireLoggedInProcedure";

export const teamsMemberRouter = trpc.router({
    getMembers: requireLoggedInProcedure
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

    addMember: requireLoggedInProcedure
        .use(requiredTeamRole(["MANAGER", "OWNER"]))
        .input(
            z.object({
                teamId: z.string(),
                userEmail: z.string().email(),
            })
        )
        .mutation(async (opts) => {
            // Check if the Team is Locked
            const lockedTeam = await prisma.team.findFirst({
                where: {
                    id: opts.input.teamId,
                    locked: true,
                },
            });

            if (lockedTeam) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Team is Locked, Cannot Add Members",
                });
            }

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
