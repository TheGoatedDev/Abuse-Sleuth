import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";
import { TeamModel } from "@abuse-sleuth/prisma/validator";

import { requiredTeamRole } from "../../middlewares/requiredTeamRole";
import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";

export const editController = requireLoggedInProcedure
    .use(requiredTeamRole(["OWNER"]))
    .input(
        z.object({
            teamId: z.string(),
            data: TeamModel.omit({
                id: true,
                stripeSubId: true,
                locked: true,
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
