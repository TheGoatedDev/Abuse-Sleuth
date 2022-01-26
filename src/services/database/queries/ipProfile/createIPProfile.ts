import prisma from "@services/database/prisma";

export const createIPProfile = async (ipAddress: string) => {
    const ipProfile = await prisma.iPProfile.create({
        data: {
            ipAddress,
        },
    });
    return ipProfile;
};
