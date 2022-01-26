import prisma from "@services/database/prisma";

export const updateAIPDBProfile = async (
    id: number,
    aipdbProfile: IAIPDBProfileUpdateData
) => {
    const aipdb = await prisma.aIPDBProfile.update({
        where: {
            aipdbProfileID: id,
        },
        data: {
            abuseScore: aipdbProfile.abuseScore,
            country: aipdbProfile.country,
            usageType: aipdbProfile.usageType,
            isp: aipdbProfile.isp,
            domain: aipdbProfile.domain,
            totalReports: aipdbProfile.totalReports,
            totalDistinctReportee: aipdbProfile.totalDistinctReportee,
        },
    });
    return aipdb;
};
