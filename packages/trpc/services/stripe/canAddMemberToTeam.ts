import { prisma } from "@abuse-sleuth/prisma";

import { getPlanLimitsFromTeam } from "./getPlanLimitsFromTeam";

export const canAddMemberToTeam = async (teamId: string): Promise<boolean> => {
    const members = await prisma.teamMember.count({
        where: {
            teamId,
        },
    });

    const { membersLimit } = await getPlanLimitsFromTeam(teamId);

    return members < membersLimit;
};
