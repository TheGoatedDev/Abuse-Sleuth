import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";

import { requiredTeamRole } from "../../middlewares/requiredTeamRole";
import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";

export const getController = requireLoggedInProcedure
    .use(requiredTeamRole(["USER", "MANAGER", "OWNER"]))
    .input(
        z.object({
            teamId: z.string(),
        })
    )
    .query(async (opts) => {
        const team = await prisma.team.findFirstOrThrow({
            where: {
                id: opts.input.teamId,
                users: {
                    some: {
                        user: {
                            id: opts.ctx.user?.id,
                        },
                    },
                },
            },
        });

        return team;
    });
