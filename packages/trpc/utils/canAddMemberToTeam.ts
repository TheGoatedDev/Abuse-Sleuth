import { prisma } from "@abuse-sleuth/prisma";

import { getPlanLimitsFromTeam } from "./getPlanLimitsFromTeam";

export const canAddMemberToTeam = async (teamId: string): Promise<boolean> => {
    const users = await prisma.userOnTeam.count({
        where: {
            teamId,
        },
    });

    const { usersLimit } = await getPlanLimitsFromTeam(teamId);

    return users < usersLimit;
};
