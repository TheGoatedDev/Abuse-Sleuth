import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(405).send("");
    }

    const { ip } = req.query;

    const report = await prisma.aIPDB_Report.findUnique({
        where: {
            ipAddress: ip as string,
        },
    });

    res.status(200).json(report);
};

export default handler;
