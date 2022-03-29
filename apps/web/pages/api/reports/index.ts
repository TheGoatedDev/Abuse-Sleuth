import { prisma } from "@abuse-sleuth/prisma";

import getHandler from "@libs/api/handler";
import requireAuth from "@libs/api/middleware/requireAuth";
import { getSession } from "@libs/auth/authServerHelpers";

const handler = getHandler();

handler.use(requireAuth);

handler.get(async (req, res) => {
    const session = await getSession(req, res);

    console.log(JSON.stringify(session, null, 4));

    const reports = await prisma.scanReport.findMany({
        where: {
            userId: session.id,
        },
    });

    // console.log(reports);

    res.status(200).send({
        ok: true,
        data: reports,
    });
});

export default handler;
