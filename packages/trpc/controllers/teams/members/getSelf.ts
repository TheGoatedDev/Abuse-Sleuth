import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";

import { requiredTeamRole } from "../../../middlewares/requiredTeamRole";
import { requireLoggedInProcedure } from "../../../procedures/requireLoggedInProcedure";

export const getSelf = requireLoggedInProcedure
    .use(requiredTeamRole(["USER", "MANAGER", "OWNER"]))
    .input(
        z.object({
            teamId: z.string(),
        })
    )
    .query(async (opts) => {
        const teamMember = await prisma.userOnTeam.findUnique({
            where: {
                userId_teamId: {
                    teamId: opts.input.teamId,
                    userId: opts.ctx.user?.id ?? "",
                },
            },
            include: {
                user: true,
            },
        });

        return teamMember;
    });

export default getSelf;
