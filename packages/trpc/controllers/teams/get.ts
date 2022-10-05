import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";

import { requiredTeamRoleMiddleware } from "../../middlewares/teams/requiredTeamRoleMiddleware";
import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";

export const getController = requireLoggedInProcedure
    .use(requiredTeamRoleMiddleware(["USER", "MANAGER", "OWNER"]))
    .input(
        z.object({
            teamId: z.string(),
        })
    )
    .query(async (opts) => {
        const team = await prisma.team.findFirstOrThrow({
            where: {
                id: opts.input.teamId,
                members: {
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
