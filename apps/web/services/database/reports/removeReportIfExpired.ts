import { prisma, ScanReport } from "@abuse-sleuth/prisma";

export const removeReportIfExpired = async (reportID: string) => {
    let report = await prisma.scanReport.findUnique({
        select: {
            expiresAt: true,
        },
        where: {
            id: reportID,
        },
    });

    if (report) {
        if (report.expiresAt < new Date()) {
            await prisma.scanReport.delete({
                where: {
                    id: reportID,
                },
            });
            return true;
        }
    }

    return false;
};

export default removeReportIfExpired;
