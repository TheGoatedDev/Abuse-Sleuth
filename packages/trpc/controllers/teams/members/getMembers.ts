import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";

import { requiredTeamRoleMiddleware } from "../../../middlewares/teams/requiredTeamRoleMiddleware";
import { requireLoggedInProcedure } from "../../../procedures/requireLoggedInProcedure";

export const getMembersController = requireLoggedInProcedure
    .use(requiredTeamRoleMiddleware(["USER", "MANAGER", "OWNER"]))
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
    });

export default getMembersController;
