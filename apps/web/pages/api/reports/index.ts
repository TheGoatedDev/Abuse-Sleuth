import { NextApiRequest } from "next";
import { StytchUser } from "types/user";

import { prisma } from "@abuse-sleuth/prisma";

import getHandler from "@libs/api/handler";
import requireAuth from "@libs/api/middleware/requireAuth";

const handler = getHandler();

handler.use(requireAuth);

handler.get(async (req: NextApiRequest & { user: StytchUser }, res) => {
    const user = req.user;

    const reports = await prisma.scanReport.findMany({
        where: {
            userId: user.id,
        },
    });

    // console.log(reports);

    res.status(200).send({
        ok: true,
        data: reports,
    });
});

export default handler;
