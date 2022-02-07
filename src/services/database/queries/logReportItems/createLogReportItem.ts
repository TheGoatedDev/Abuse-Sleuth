import { IPProfile, LogReport, LogReportItem } from "@prisma/client";
import prisma from "@services/database/prismaClient";

const createLogReportItem = async (
    logReport: LogReport,
    ipProfile: IPProfile
): Promise<LogReportItem> => {
    return await prisma.logReportItem.create({
        data: {
            logReport: {
                connect: {
                    id: logReport.id,
                },
            },
            ipProfile: {
                connect: {
                    id: ipProfile.id,
                },
            },
        },
    });
};

export default createLogReportItem;
