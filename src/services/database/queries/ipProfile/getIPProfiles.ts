import prisma from "@services/database/prisma";

export const getIPProfiles = async (skip?: number, take?: number) => {
    const ipProfiles = await prisma.iPProfile.findMany({
        skip,
        take,
    });
    return ipProfiles;
};
