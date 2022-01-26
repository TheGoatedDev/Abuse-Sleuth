import { AIPDBProfile, IPProfile } from "@prisma/client";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import joiValidation from "@libs/middlewares/joiValidation";
import prisma from "@services/database/prisma";
import { GET_AIPDB_Data } from "@libs/types";
import apiHandler from "@libs/utils/apiHandler";

const querySchema = Joi.object({
    limit: Joi.number().default(30).max(50).min(15),
    page: Joi.number().default(1).min(1),
});

interface ResponseType {
    ok: boolean;
    data: GET_AIPDB_Data[];
}

const handler = apiHandler.get(
    joiValidation({ query: querySchema }),
    async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
        let reports: (AIPDBProfile & { ipProfile: IPProfile })[] | null[] = [];

        if (req.query.page) {
            const page: number = req.query.page ? Number(req.query.page) : 1;
            const limit: number = req.query.limit
                ? Number(req.query.limit)
                : 30;
            const skip: number = (page - 1) * limit;
            reports = await prisma.aIPDBProfile.findMany({
                skip: skip,
                take: limit,
                include: { ipProfile: true },
            });
        } else {
            reports = await prisma.aIPDBProfile.findMany({
                include: { ipProfile: true },
            });
        }

        const data: GET_AIPDB_Data[] = reports.map((x) => ({
            ipAddress: x.ipProfile.ipAddress,
            abuseScore: x.abuseScore,
            country: x.country,
            usageType: x.usageType,
            isp: x.isp,
            domain: x.domain,
            totalReports: x.totalReports,
            totalDistinctReportee: x.totalDistinctReportee,
            createdAt: x.createdAt,
            updatedAt: x.updatedAt,
        }));

        res.status(200).json({
            ok: true,
            data: data,
        });
    }
);

export default handler;
