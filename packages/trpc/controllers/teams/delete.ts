import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";

import { requiredTeamRoleMiddleware } from "../../middlewares/teams/requiredTeamRoleMiddleware";
import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";

export const deleteController = requireLoggedInProcedure
    .use(requiredTeamRoleMiddleware(["OWNER"]))
    .input(
        z.object({
            teamId: z.string(),
        })
    )
    .mutation(async (opts) => {
        const team = await prisma.team.delete({
            where: {
                id: opts.input.teamId,
            },
        });

        return team;
    });
