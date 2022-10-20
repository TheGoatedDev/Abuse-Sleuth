import { prisma } from "@abuse-sleuth/prisma";

import { getPlanLimitsFromTeam } from "../stripe/getPlanLimitsFromTeam";

export const canAddMemberToTeam = async (teamId: string): Promise<boolean> => {
    const members = await prisma.teamMember.count({
        where: {
            teamId,
            team: {
                canAddMember: true,
            },
        },
    });

    const { membersLimit } = await getPlanLimitsFromTeam(teamId);

    return members < membersLimit;
};
