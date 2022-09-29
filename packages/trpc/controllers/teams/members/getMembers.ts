import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";

import { requiredTeamRole } from "../../../middlewares/requiredTeamRole";
import { requireLoggedInProcedure } from "../../../procedures/requireLoggedInProcedure";

export const getMembersController = requireLoggedInProcedure
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
    });

export default getMembersController;
