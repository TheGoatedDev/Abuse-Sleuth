import { LogReport } from "@prisma/client";
import prisma from "@services/database/prismaClient";

const getLogReports = async (): Promise<LogReport[]> => {
    return await prisma.logReport.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

export default getLogReports;
