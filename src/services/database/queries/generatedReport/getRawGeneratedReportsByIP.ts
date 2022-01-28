import prisma from "@services/database/prisma";

export const getRawGeneratedReportsByIP = async (ipAddress: string) => {
    const reports = await prisma.generatedReport.findMany({
        where: {
            links: {
                some: {
                    ipProfile: {
                        ipAddress,
                    },
                },
            },
        },
    });

    return reports;
};
