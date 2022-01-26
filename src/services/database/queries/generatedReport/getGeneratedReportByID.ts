import prisma from "@services/database/prisma";

export const getGeneratedReportByID = async (id: number) => {
    const generatedReport = await prisma.generatedReport.findFirst({
        where: {
            generatedReportID: id,
        },
    });
    return generatedReport;
};
