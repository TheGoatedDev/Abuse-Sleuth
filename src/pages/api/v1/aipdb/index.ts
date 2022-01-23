import { AIPDBReport } from "@prisma/client";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import joiValidation from "../../../../lib/middlewares/joiValidation";
import prisma from "../../../../lib/prisma";
import apiHandler from "../../../../lib/utils/apiHandler";

const querySchema = Joi.object({
    limit: Joi.number().default(30).max(50).min(15),
    page: Joi.number().default(1).min(1),
});

const handler = apiHandler.get(
    joiValidation({ query: querySchema }),
    async (req: NextApiRequest, res: NextApiResponse) => {
        let reports: AIPDBReport[] | null[] = [];

        if (req.query.page) {
            const page: number = req.query.page ? Number(req.query.page) : 1;
            const limit: number = req.query.limit
                ? Number(req.query.limit)
                : 30;
            const skip: number = (page - 1) * limit;
            reports = await prisma.aIPDBReport.findMany({
                skip: skip,
                take: limit,
            });
        } else {
            reports = await prisma.aIPDBReport.findMany({});
        }

        res.status(200).json({
            ok: true,
            data: reports,
        });
    }
);

export default handler;
