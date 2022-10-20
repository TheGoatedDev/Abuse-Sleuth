import { prisma } from "@abuse-sleuth/prisma";

export const canDeleteTeam = async (teamId: string): Promise<boolean> => {
    const team = await prisma.team.findFirst({
        where: {
            id: teamId,
            canDeleteTeam: true,
        },
    });

    return !!team;
};
