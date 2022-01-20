import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const count = await prisma.aIPDB_Report.count();
        res.status(200).json({ count: count });
    } else {
        res.status(405).send(null);
    }
}
