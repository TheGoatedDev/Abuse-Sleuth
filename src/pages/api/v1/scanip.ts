import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import joiValidation from "@libs/middlewares/joiValidation";
import apiHandler from "@libs/utils/apiHandler";
import { getProfile } from "@providers/aipdbProvider";

const queryScheme = Joi.object({
    ipAddress: Joi.string()
        .required()
        .regex(/^(?:[0-9]{1,3}.){3}[0-9]{1,3}$/)
        .message("Query Value was not a valid IP Address"),
});

// Responds with AIPDB Profile
const handler = apiHandler.get(
    joiValidation({ query: queryScheme }),
    async (req: NextApiRequest, res: NextApiResponse) => {
        const { ipAddress } = req.query;

        const result = await getProfile(ipAddress as string);

        if (result == null) {
            res.status(400).send(null);
        } else {
            res.status(200).json({
                ok: true,
                data: result,
            });
        }
    }
);

export default handler;
