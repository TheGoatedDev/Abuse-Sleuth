import prisma from "@services/database/prisma";

export const getRawIPProfileByIP = async (ipAddress: string) => {
    return await prisma.iPProfile.findFirst({
        where: {
            ipAddress,
        },
    });
};
