import { prisma, ScanReport } from "@abuse-sleuth/prisma";

export const removeReportIfExpired = async (reportID: string) => {
    let report = await prisma.scanReport.deleteMany({
        where: {
            id: reportID,
            expiresAt: {
                lte: new Date(),
            },
        },
    });

    return report.count === 0 ? false : true;
};

export default removeReportIfExpired;
