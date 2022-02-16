import { IPProfile } from "@prisma/client";
import prisma from "@services/firestore/prismaClient";

const createIPProfile = async (
    ipAddress: string,
    uid: string
): Promise<IPProfile> => {
    return await prisma.iPProfile.create({
        data: {
            ipAddress,
            firstSeenBy: uid,
            lastSeenBy: uid,
        },
    });
};

export default createIPProfile;
