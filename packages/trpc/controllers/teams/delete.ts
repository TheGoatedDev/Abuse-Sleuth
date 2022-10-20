import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";

import { canDeleteTeamMiddleware } from "../../middlewares/teams/canDeleteTeamMiddleware";
import { requiredTeamRoleMiddleware } from "../../middlewares/teams/requiredTeamRoleMiddleware";
import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";

export const deleteController = requireLoggedInProcedure
    .use(requiredTeamRoleMiddleware(["OWNER"]))
    .use(canDeleteTeamMiddleware)
    .input(
        z.object({
            teamId: z.string(),
        })
    )
    .mutation(async (opts) => {
        await prisma.teamMember.deleteMany({
            where: {
                teamId: opts.input.teamId,
            },
        });

        await prisma.team.delete({
            where: {
                id: opts.input.teamId,
            },
        });
    });
