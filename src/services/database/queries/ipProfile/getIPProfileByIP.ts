import prisma from "@services/database/prisma";

export const getIPProfileByIP = async (ipAddress: string) => {
    return await prisma.iPProfile.findFirst({
        where: {
            ipAddress,
        },
    });
};
