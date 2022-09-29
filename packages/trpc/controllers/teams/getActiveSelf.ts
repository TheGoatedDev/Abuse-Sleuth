import { prisma } from "@abuse-sleuth/prisma";

import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";

export const getActiveSelfController = requireLoggedInProcedure.query(
    async (opts) => {
        const userWithActiveTeam = await prisma.user.findUniqueOrThrow({
            where: {
                id: opts.ctx.user?.id,
            },
            include: {
                activeTeam: true,
            },
        });

        return userWithActiveTeam?.activeTeam;
    }
);

export default getActiveSelfController;
