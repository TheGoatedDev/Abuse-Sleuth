import prisma from "@services/database/prisma";

export const getGeneratedReports = async (skip?: number, take?: number) => {
    const generatedReports = await prisma.generatedReport.findMany({
        skip,
        take,
    });
    return generatedReports;
};
