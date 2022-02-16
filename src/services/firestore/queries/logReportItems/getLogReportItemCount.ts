import prisma from "@services/firestore/prismaClient";

const getLogReportItemCount = async (): Promise<number | null> => {
    return await prisma.logReportItem.count();
};

export default getLogReportItemCount;
