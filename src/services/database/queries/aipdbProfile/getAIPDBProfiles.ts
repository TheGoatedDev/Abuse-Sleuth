import prisma from "@services/database/prisma";

export const getAIPDBProfiles = async (skip?: number, take?: number) => {
    const aipdbProfiles = await prisma.aIPDBProfile.findMany({
        skip,
        take,
    });
    return aipdbProfiles;
};
