import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";

import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";

export const getSelfController = requireLoggedInProcedure
    .input(
        z.object({
            include: z
                .object({
                    activeTeam: z.boolean().optional(),
                })
                .optional(),
        })
    )
    .query((opts) => {
        return prisma.user.findFirstOrThrow({
            where: {
                id: opts.ctx.user?.id,
            },
            include: opts.input.include,
        });
    });

export default getSelfController;
