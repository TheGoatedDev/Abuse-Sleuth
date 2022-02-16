import { LogReport } from "@prisma/client";
import prisma from "@services/firestore/prismaClient";

const getLogReports = async (): Promise<LogReport[]> => {
    return await prisma.logReport.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

export default getLogReports;
