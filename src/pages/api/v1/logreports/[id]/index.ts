import runMiddleware from "@libs/helpers/runMiddleware";
import checkAuthenticated from "@libs/middlewares/checkAuthenticated";
import checkMethod from "@libs/middlewares/checkMethod";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "@libs/utils/logger";
import { LogReport } from "@prisma/client";
import getLogReportByID from "@services/database/queries/logReport/getLogReportByID";
import joiValidation from "@libs/middlewares/joiValidation";
import Joi from "joi";
import deleteLogReportByID from "@services/database/queries/logReport/deleteLogReportByID";

const querySchema = Joi.object({
    id: Joi.number().required(),
});

const handler = async (
    req: NextApiRequest & { uid: string },
    res: NextApiResponse<GenericHTTPResponse>
) => {
    await runMiddleware(req, res, checkMethod(["GET", "DELETE"]));
    await runMiddleware(req, res, checkAuthenticated);
    await runMiddleware(req, res, joiValidation({ query: querySchema }));

    const ownerUID = req.uid;
    const { id: logReportID } = req.query;

    if (req.method === "GET") {
        logger.info(`Getting Log Report #${logReportID} for ${ownerUID}`);

        let logReport: LogReport | null;
        try {
            logReport = await getLogReportByID(Number(logReportID));
            if (logReport?.owner !== ownerUID) {
                logger.error(
                    `User ${ownerUID} does not own Log Report ${req.query.id}`
                );
                return res.status(403).json({
                    ok: false,
                    data: "User does not own Log Report",
                });
            }
        } catch (error) {
            logger.error(`Error getting Log Report for ${ownerUID}: `, error);
            throw error;
        }

        return res.status(200).json({ ok: true, data: logReport });
    }

    if (req.method === "DELETE") {
        logger.info(`Deleting Log Report #${logReportID} for ${ownerUID}`);

        let logReport: LogReport | null;
        try {
            logReport = await getLogReportByID(Number(logReportID));
            if (logReport.owner !== ownerUID) {
                logger.error(
                    `User ${ownerUID} does not own Log Report ${logReportID}`
                );
                return res.status(403).json({
                    ok: false,
                    data: "User does not own Log Report",
                });
            }
        } catch (error) {
            logger.error(`Error getting Log Report for ${ownerUID}: `, error);
            throw error;
        }

        try {
            await deleteLogReportByID(Number(logReportID));
        } catch (error) {
            logger.error(`Error deleting Log Report for ${ownerUID}: `, error);
            throw error;
        }

        return res.status(200).json({ ok: true, data: "Deleted Log Report" });
    }
};

export default handler;
