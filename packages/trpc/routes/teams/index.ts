import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";

import { trpc } from "../../initTRPC";

export const teamsRouter = trpc.router({
    getSelfAllTeam: trpc.procedure.query(async (opts) => {
        if (!opts.ctx.session) {
            throw new TRPCError({
                message: "No User Session Found",
                code: "UNAUTHORIZED",
            });
        }

        return await prisma.team.findMany({
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
});
