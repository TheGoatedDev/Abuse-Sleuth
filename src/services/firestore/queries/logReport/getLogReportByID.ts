import { IPProfile, LogReport } from "@prisma/client";
import prisma from "@services/firestore/prismaClient";

const getLogReportByID = async (id: number): Promise<LogReport | null> => {
    return await prisma.logReport.findFirst({
        where: {
            id,
        },
    });
};

export default getLogReportByID;
