import runMiddleware from "@libs/helpers/runMiddleware";
import checkAuthenticated from "@libs/middlewares/checkAuthenticated";
import checkMethod from "@libs/middlewares/checkMethod";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "@libs/utils/logger";
import { LogReport } from "@prisma/client";
import getLogReportByID from "@services/database/queries/logReport/getLogReportByID";
import joiValidation from "@libs/middlewares/joiValidation";
import Joi from "joi";

const querySchema = Joi.object({
    id: Joi.number().required(),
});

const handler = async (
    req: NextApiRequest & { uid: string },
    res: NextApiResponse<GenericHTTPResponse>
) => {
    await runMiddleware(req, res, checkMethod(["GET"]));
    await runMiddleware(req, res, checkAuthenticated);
    await runMiddleware(req, res, joiValidation({ query: querySchema }));

    logger.info(`Getting Log Report #${req.query.id} for ${req.uid}`);

    let logReport: LogReport | null;
    try {
        logReport = await getLogReportByID(Number(req.query.id));
        if (logReport?.owner !== req.uid) {
            logger.error(
                `User ${req.uid} does not own Log Report ${req.query.id}`
            );
            return res.status(403).json({
                ok: false,
                data: "User does not own Log Report",
            });
        }
    } catch (error) {
        logger.error(`Error getting Log Report for ${req.uid}: `, error);
        throw error;
    }

    res.status(200).json({ ok: true, data: logReport });
};

export default handler;
