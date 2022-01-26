import prisma from "@services/database/prisma";

export const getGeneratedReportsByIP = async (ipAddress: string) => {
    const reports = await prisma.generatedReport.findMany({
        where: {
            links: {
                every: {
                    ipProfile: {
                        ipAddress,
                    },
                },
            },
        },
    });

    return reports;
};
