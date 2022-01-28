import prisma from "@services/database/prisma";

export const getRawGeneratedReportByID = async (id: number) => {
    const generatedReport = await prisma.generatedReport.findFirst({
        where: {
            generatedReportID: id,
        },
    });
    return generatedReport;
};
