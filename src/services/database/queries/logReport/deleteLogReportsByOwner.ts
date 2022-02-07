import { Prisma } from "@prisma/client";
import prisma from "@services/database/prismaClient";

const deleteLogReportByID = async (
    uid: string
): Promise<Prisma.BatchPayload> => {
    return await prisma.logReport.deleteMany({
        where: {
            owner: uid,
        },
    });
};

export default deleteLogReportByID;
