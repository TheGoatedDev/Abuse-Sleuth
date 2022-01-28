import prisma from "@services/database/prisma";

export const getRawAIPDBProfileByID = async (id: number) => {
    const aipdb = await prisma.aIPDBProfile.findFirst({
        where: {
            aipdbProfileID: id,
        },
    });
    return aipdb;
};
