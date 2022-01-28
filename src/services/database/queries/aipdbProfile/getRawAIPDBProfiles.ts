import prisma from "@services/database/prisma";

export const getRawAIPDBProfiles = async (skip?: number, take?: number) => {
    const aipdbProfiles = await prisma.aIPDBProfile.findMany({
        skip,
        take,
    });
    return aipdbProfiles;
};
