import { prisma, ScanReport } from "@abuse-sleuth/prisma";

import removeReportIfExpired from "./removeReportIfExpired";

export const removeAllExpiredReportsByUser = async (userID: string) => {
    const checkExpired = await prisma.scanReport.findMany({
        select: {
            id: true,
        },
        where: {
            user: {
                id: userID,
            },
        },
    });

    let removed = 0;
    for (const report of checkExpired) {
        await removeReportIfExpired(report.id);
        removed++;
    }

    return removed;
};

export default removeAllExpiredReportsByUser;
