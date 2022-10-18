import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";
import { TeamModel } from "@abuse-sleuth/prisma/validator";

import { requiredTeamRoleMiddleware } from "../../middlewares/teams/requiredTeamRoleMiddleware";
import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";

export const editController = requireLoggedInProcedure
    .use(requiredTeamRoleMiddleware(["OWNER"]))
    .input(
        z.object({
            teamId: z.string(),
            data: TeamModel.omit({
                id: true,
                stripeSubId: true,
                canAddMember: true,
                canBillingTeam: true,
                canDeleteTeam: true,
                canEditTeam: true,
                canGenerateReport: true,
                canScan: true,
                createdAt: true,
                updatedAt: true,
            }).partial(),
        })
    )
    .mutation(async (opts) => {
        const newTeam = await prisma.team.update({
            data: {
                ...opts.input.data,
            },
            where: {
                id: opts.input.teamId,
            },
        });

        return newTeam;
    });

export default editController;
