import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import joiValidation from "@libs/middlewares/joiValidation";
import { Response } from "@libs/types";
import apiHandler from "@libs/utils/apiHandler";
import { log } from "@libs/utils/log";
import { ipRegex } from "@libs/utils/regexTest";
import { AIPDBProfile } from "@prisma/client";
import { getRawAIPDBProfileByIP } from "@services/database/queries/aipdbProfile/getRawAIPDBProfileByIP";

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
        res: NextApiResponse<Response<AIPDBProfile | null>>
    ) => {
        try {
            const { ip } = req.query;

            const profile = await getRawAIPDBProfileByIP(ip as string);

            res.status(200).json({ ok: profile !== null, data: profile });
        } catch (error) {
            log.error(error);
            throw error;
        }
    }
);

export default handler;
