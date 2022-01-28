import prisma from "@services/database/prisma";

export const getRawIPProfileByID = async (id: number) => {
    return await prisma.iPProfile.findFirst({
        where: {
            ipProfileID: id,
        },
    });
};
