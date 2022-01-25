import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import joiValidation from "@lib/middlewares/joiValidation";
import { GET_AIPDB_Data, Response } from "@lib/types";
import apiHandler from "@lib/utils/apiHandler";
import { log } from "@lib/utils/log";
import { ipRegex } from "@lib/utils/regexTest";
import { getProfile } from "@providers/aipdbProvider";

const queryScheme = Joi.object({
    ip: Joi.string()
        .required()
        .regex(ipRegex)
        .message("Query Value was not a valid IP Address"),
});

const handler = apiHandler.get(
    joiValidation({ query: queryScheme }),
    async (
        req: NextApiRequest,
        res: NextApiResponse<Response<GET_AIPDB_Data>>
    ) => {
        try {
            const { ip } = req.query;

            const profile = await getProfile(ip as string);
            //console.log(report);
            if (profile === null) {
                throw new Error(
                    "Error Occured while getting the AIPDB Profile"
                );
            }

            const data: GET_AIPDB_Data = {
                ipAddress: ip as string,
                abuseScore: profile.abuseScore,
                country: profile.country,
                usageType: profile.usageType,
                isp: profile.isp,
                domain: profile.domain,
                totalReports: profile.totalReports,
                totalDistinctReportee: profile.totalDistinctReportee,
                createdAt: profile.createdAt,
                updatedAt: profile.updatedAt,
            };

            res.status(200).json({ ok: profile !== null, data: data });
        } catch (error) {
            log.error(error);
            throw error;
        }
    }
);

export default handler;
