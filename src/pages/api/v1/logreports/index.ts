import runMiddleware from "@libs/helpers/runMiddleware";
import checkAuthenticated from "@libs/middlewares/checkAuthenticated";
import checkMethod from "@libs/middlewares/checkMethod";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "@libs/utils/logger";
import getLogReportsByOwner from "@services/database/queries/logReport/getLogReportsByOwner";
import { LogReport } from "@prisma/client";
import getLogReportItemCountByLogReport from "@services/database/queries/logReportItems/getLogReportItemCountByLogReport";

const handler = async (
    req: NextApiRequest & { uid: string },
    res: NextApiResponse<GenericHTTPResponse>
) => {
    await runMiddleware(req, res, checkMethod(["GET"]));
    await runMiddleware(req, res, checkAuthenticated);

    logger.info(`Getting all Log Reports for ${req.uid}`);

    let logReports: LogReport[] | null;
    try {
        logReports = await getLogReportsByOwner(req.uid);
    } catch (error) {
        logger.error(`Error getting Log Reports for ${req.uid}: `, error);
        throw error;
    }

    if (logReports === null) {
        logger.error(`Log Reports for ${req.uid} was null`);
        throw new Error("Log Reports was null");
    }

    let data = [];
    for (const logReport of logReports) {
        const itemCount = await getLogReportItemCountByLogReport(logReport);
        data.push({
            ...logReport,
            itemCount: itemCount,
        });
    }

    res.status(200).json({ ok: true, data: data });
};

export default handler;
