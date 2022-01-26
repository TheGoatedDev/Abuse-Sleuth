import prisma from "@services/database/prisma";

export const getTotalIPProfiles = async () => {
    return await prisma.iPProfile.count();
};
