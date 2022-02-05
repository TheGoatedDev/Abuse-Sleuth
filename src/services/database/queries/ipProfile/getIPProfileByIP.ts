import { IPProfile } from "@prisma/client";
import prisma from "@services/database/prismaClient";

const getIPProfileByIP = async (
    ipAddress: string
): Promise<IPProfile | null> => {
    return await prisma.iPProfile.findFirst({
        where: {
            ipAddress,
        },
    });
};

export default getIPProfileByIP;
