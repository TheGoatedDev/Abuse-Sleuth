import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import joiValidation from "@libs/middlewares/joiValidation";
import checkAuthenticated from "@libs/middlewares/checkAuthenticated";
import { getIPProfile } from "@services/firebase/firestore/queries/ipProfile/getIPProfile";
import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";
import logger from "@libs/utils/logger";
import runMiddleware from "@libs/helpers/runMiddleware";

const queryScheme = Joi.object({
    ipAddress: Joi.string()
        .required()
        .regex(/^(?:[0-9]{1,3}.){3}[0-9]{1,3}$/)
        .message("Query Value was not a valid IP Address"),
});

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<GenericHTTPResponse<any>>
) => {
    await runMiddleware(req, res, checkAuthenticated);
    await runMiddleware(req, res, joiValidation({ query: queryScheme }));

    if (req.method === "GET") {
        return MethodGET(req, res);
    }

    res.status(405).send({
        ok: false,
        data: "Method not allowed",
    });
};

const MethodGET = async (
    req: NextApiRequest,
    res: NextApiResponse<GenericHTTPResponse<any>>
) => {
    const { ipAddress } = req.query;

    try {
        const ipProfileDoc = await getIPProfile(
            ipAddress as string,
            firebaseAdminFirestore
        );

        // const ipProfileDoc = {
        //     ipAddress: ipAddress as string,
        // };

        logger.debug(ipProfileDoc);

        if (ipProfileDoc == null) {
            res.status(400).send({
                ok: false,
                data: `No IP Profile found for ${ipAddress}`,
            });
            return;
        } else {
            res.status(200).send({
                ok: true,
                data: ipProfileDoc,
            });
            return;
        }
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

export default handler;
