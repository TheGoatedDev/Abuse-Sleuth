import prisma from "@services/database/prisma";

export const getRawReportIPProfileLinksByIP = async (ipAddress: string) => {
    return await prisma.reportIPProfileLink.findMany({
        where: {
            ipProfile: {
                ipAddress: ipAddress,
            },
        },
    });
};
