import runMiddleware from "@libs/helpers/runMiddleware";
import checkAuthenticated from "@libs/middlewares/checkAuthenticated";
import checkMethod from "@libs/middlewares/checkMethod";
import { NextApiRequest, NextApiResponse } from "next";
import Logger from "@libs/utils/Logger";
import getLogReportByID from "@services/firestore/queries/logReport/getLogReportByID";
import joiValidation from "@libs/middlewares/joiValidation";
import Joi from "joi";
import deleteLogReportByID from "@services/firestore/queries/logReport/deleteLogReportByID";

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
        Logger.info(
            "API /v1/logreports/[id]",
            `Getting Log Report #${logReportID} for ${ownerUID}`
        );

        let logReport: any | null;
        try {
            logReport = await getLogReportByID(Number(logReportID));
            if (logReport?.owner !== ownerUID) {
                Logger.error(
                    "API /v1/logreports/[id]",
                    `User ${ownerUID} does not own Log Report ${req.query.id}`
                );
                return res.status(403).json({
                    ok: false,
                    data: "User does not own Log Report",
                });
            }
        } catch (error) {
            Logger.error(
                "API /v1/logreports/[id]",
                `Error getting Log Report for ${ownerUID}: `,
                error
            );
            throw error;
        }

        return res.status(200).json({ ok: true, data: logReport });
    }

    if (req.method === "DELETE") {
        Logger.info(
            "API /v1/logreports/[id]",
            `Deleting Log Report #${logReportID} for ${ownerUID}`
        );

        let logReport: any | null;
        try {
            logReport = await getLogReportByID(Number(logReportID));

            if (logReport == null) {
                Logger.error(
                    "API /v1/logreports/[id]",
                    `Log Report ${logReportID} does not exist`
                );
                return res.status(404).json({
                    ok: false,
                    data: "Log Report does not exist",
                });
            }

            if (logReport.owner !== ownerUID) {
                Logger.error(
                    "API /v1/logreports/[id]",
                    `User ${ownerUID} does not own Log Report ${logReportID}`
                );
                return res.status(403).json({
                    ok: false,
                    data: "User does not own Log Report",
                });
            }
        } catch (error) {
            Logger.error(
                "API /v1/logreports/[id]",
                `Error getting Log Report for ${ownerUID}: `,
                error
            );
            throw error;
        }

        try {
            await deleteLogReportByID(Number(logReportID));
        } catch (error) {
            Logger.error(
                "API /v1/logreports/[id]",
                `Error deleting Log Report for ${ownerUID}: `,
                error
            );
            throw error;
        }

        return res.status(200).json({ ok: true, data: "Deleted Log Report" });
    }
};

export default handler;
