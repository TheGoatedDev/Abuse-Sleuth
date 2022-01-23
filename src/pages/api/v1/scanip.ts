import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import joiValidation from "../../../lib/middlewares/joiValidation";
import { scanIP } from "../../../lib/utils/aipdbClient";
import apiHandler from "../../../lib/utils/apiHandler";

const queryScheme = Joi.object({
    ipAddress: Joi.string()
        .required()
        .regex(/^(?:[0-9]{1,3}.){3}[0-9]{1,3}$/)
        .message("Query Value was not a valid IP Address"),
    ignoreCache: Joi.bool().required(),
});

const handler = apiHandler.get(
    joiValidation({ query: queryScheme }),
    async (req: NextApiRequest, res: NextApiResponse) => {
        const { ipAddress, ignoreCache } = req.query;

        const result = await scanIP(
            ipAddress as string,
            ignoreCache === "true"
        );

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
