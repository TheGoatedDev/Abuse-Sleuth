import prisma from "@services/database/prismaClient";

const getLogReportItemCount = async (): Promise<number | null> => {
    return await prisma.logReportItem.count();
};

export default getLogReportItemCount;
