import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import getHandler from "@libs/api/handler";
import requireAuth from "@libs/api/middleware/requireAuth";
import prisma from "@libs/prisma";

const handler = getHandler();

handler.use(requireAuth);

handler.get(async (req, res) => {
    const session = await getSession({ req });

    const reports = await prisma.report.findMany({
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
