import { LogReport, LogReportItem } from "@prisma/client";
import prisma from "@services/firestore/prismaClient";

const getLogReportItemCountByLogReport = async (
    logReport: LogReport
): Promise<number> => {
    return await prisma.logReportItem.count({
        where: {
            logReportId: logReport.id,
        },
    });
};

export default getLogReportItemCountByLogReport;
