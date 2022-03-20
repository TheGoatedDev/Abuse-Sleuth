import { getSession } from "next-auth/react";

import { prisma } from "@abuse-sleuth/prisma";

import getHandler from "@libs/api/handler";
import requireAuth from "@libs/api/middleware/requireAuth";

const handler = getHandler();

handler.use(requireAuth);

handler.get(async (req, res) => {
    const session = await getSession({ req });

    const reports = await prisma.scanReport.findMany({
        where: {
            ownerId: session.user.id,
        },
    });

    // console.log(reports);

    res.status(200).send({
        ok: true,
        data: reports,
    });
});

export default handler;
