import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import joiValidation from "@libs/middlewares/joiValidation";
import { GET_AIPDB_Data, Response } from "@libs/types";
import apiHandler from "@libs/utils/apiHandler";
import { log } from "@libs/utils/log";
import { ipRegex } from "@libs/utils/regexTest";
import { getProfile } from "@providers/aipdbProvider";
import { AIPDBProfile } from "@prisma/client";
import { getAIPDBProfileByIP } from "@services/database/queries/aipdbProfile/getAIPDBProfileByIP";

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

            const profile = await getAIPDBProfileByIP(ip as string);

            res.status(200).json({ ok: profile !== null, data: profile });
        } catch (error) {
            log.error(error);
            throw error;
        }
    }
);

export default handler;
