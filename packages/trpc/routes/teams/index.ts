import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";

import { trpc } from "../../initTRPC";

export const teamsRouter = trpc.router({
    getSelf: trpc.procedure.query((context) => {
        if (!context.ctx.session) {
            throw new TRPCError({
                message: "No User Session Found",
                code: "UNAUTHORIZED",
            });
        }

        return prisma.team.findMany({
            where: {
                users: {
                    some: {
                        user: {
                            id: context.ctx.session.user?.id,
                        },
                    },
                },
            },
        });
    }),
});
