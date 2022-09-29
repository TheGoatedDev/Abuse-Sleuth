import { prisma } from "@abuse-sleuth/prisma";

import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";

export const getAllSelfController = requireLoggedInProcedure.query(
    async (opts) => {
        const teams = await prisma.team.findMany({
            where: {
                users: {
                    some: {
                        user: {
                            id: opts.ctx.user?.id,
                        },
                    },
                },
            },
        });

        return teams;
    }
);

export default getAllSelfController;
