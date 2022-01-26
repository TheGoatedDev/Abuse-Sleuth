import { GeneratedReport, IPProfile } from "@prisma/client";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { getReportWithIPProfiles } from "@libs/helpers/reportHelper";
import joiValidation from "@libs/middlewares/joiValidation";
import { Response } from "@libs/types";
import apiHandler from "@libs/utils/apiHandler";
import { ipRegex } from "@libs/utils/regexTest";
import { getGeneratedReportsByIP } from "@services/database/queries/generatedReport/getGeneratedReportsByIP";

const queryScheme = Joi.object({
    ip: Joi.string()
        .required()
        .regex(ipRegex)
        .message("Query Value was not a valid IP Address"),
});

// TODO: Finish this Off with Proper Error Handling
const handler = apiHandler.get(
    joiValidation({ query: queryScheme }),
    async (
        req: NextApiRequest,
        res: NextApiResponse<Response<GeneratedReport[] | null>>
    ) => {
        const { ip } = req.query;

        const reports = await getGeneratedReportsByIP(ip as string);

        res.status(200).json({ ok: reports !== null, data: reports });
    }
);

export default handler;
