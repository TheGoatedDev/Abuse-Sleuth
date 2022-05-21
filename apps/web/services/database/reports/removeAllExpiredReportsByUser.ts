import { prisma, ScanReport } from "@abuse-sleuth/prisma";

import removeReportIfExpired from "./removeReportIfExpired";

export const removeAllExpiredReportsByUser = async (userID: string) => {
    const checkExpired = await prisma.scanReport.deleteMany({
        where: {
            user: {
                id: userID,
            },
            expiresAt: {
                lte: new Date(),
            },
        },
    });
    console.log(checkExpired.count);

    return checkExpired.count;
};

export default removeAllExpiredReportsByUser;
