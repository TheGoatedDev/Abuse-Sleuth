import prisma from "@services/database/prisma";

export const getIPProfileByID = async (id: number) => {
    return await prisma.iPProfile.findFirst({
        where: {
            ipProfileID: id,
        },
    });
};
