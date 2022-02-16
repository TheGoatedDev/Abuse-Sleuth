import { LogReport } from "@prisma/client";
import prisma from "@services/firestore/prismaClient";

const createLogReport = async (uid: string): Promise<LogReport> => {
    return await prisma.logReport.create({
        data: {
            owner: uid,
        },
    });
};

export default createLogReport;
