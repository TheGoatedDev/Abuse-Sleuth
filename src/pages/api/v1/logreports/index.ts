import runMiddleware from "@libs/helpers/runMiddleware";
import checkAuthenticated from "@libs/middlewares/checkAuthenticated";
import checkMethod from "@libs/middlewares/checkMethod";
import { NextApiRequest, NextApiResponse } from "next";
import Logger from "@libs/utils/Logger";
import getLogReportsByOwner from "@services/firestore/queries/logReport/getLogReportsByOwner";
import { LogReport } from "@prisma/client";
import getLogReportItemCountByLogReport from "@services/firestore/queries/logReportItems/getLogReportItemCountByLogReport";

const handler = async (
    req: NextApiRequest & { uid: string },
    res: NextApiResponse<GenericHTTPResponse>
) => {
    await runMiddleware(req, res, checkMethod(["GET"]));
    await runMiddleware(req, res, checkAuthenticated);

    Logger.info("API /v1/logreports", `Getting all Log Reports for ${req.uid}`);

    let logReports: LogReport[] | null;
    try {
        logReports = await getLogReportsByOwner(req.uid);
    } catch (error) {
        Logger.error(
            "API /v1/logreports",
            `Error getting Log Reports for ${req.uid}: `,
            error
        );
        throw error;
    }

    if (logReports === null) {
        Logger.error(
            "API /v1/logreports",
            `Log Reports for ${req.uid} was null`
        );
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
