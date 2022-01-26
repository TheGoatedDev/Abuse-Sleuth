import prisma from "@services/database/prisma";

export const getAIPDBProfileByID = async (ipAddress: string) => {
    const aipdb = await prisma.aIPDBProfile.findFirst({
        where: {
            ipProfile: {
                ipAddress,
            },
        },
    });
    return aipdb;
};
