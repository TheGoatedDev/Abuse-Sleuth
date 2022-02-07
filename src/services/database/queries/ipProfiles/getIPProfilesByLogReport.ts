import { IPProfile, LogReport } from "@prisma/client";
import prisma from "@services/database/prismaClient";

const getIPProfileByLogReport = async (
    logReport: LogReport
): Promise<IPProfile[]> => {
    return await prisma.iPProfile.findMany({
        where: {
            logReportItems: {
                some: {
                    logReportId: logReport.id,
                },
            },
        },
    });
};

export default getIPProfileByLogReport;
