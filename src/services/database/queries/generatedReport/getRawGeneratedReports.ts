import prisma from "@services/database/prisma";

export const getRawGeneratedReports = async (skip?: number, take?: number) => {
    const generatedReports = await prisma.generatedReport.findMany({
        skip,
        take,
    });
    return generatedReports;
};
