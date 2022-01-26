import { IPProfile } from "@prisma/client";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { getReportWithIPProfiles } from "@libs/helpers/reportHelper";
import joiValidation from "@libs/middlewares/joiValidation";
import { Response } from "@libs/types";
import apiHandler from "@libs/utils/apiHandler";

const queryScheme = Joi.object({
    id: Joi.number().required(),
});

// TODO: Finish this Off with Proper Error Handling
const handler = apiHandler.get(
    joiValidation({ query: queryScheme }),
    async (
        req: NextApiRequest,
        res: NextApiResponse<Response<IPProfile[] | null>>
    ) => {
        const { id } = req.query;
        const idNum = Number(id);

        const report = await getReportWithIPProfiles(idNum);

        const data = report.links.map((value, i) => value.ipProfile);

        res.status(200).json({ ok: report !== null, data: data });
    }
);

export default handler;
