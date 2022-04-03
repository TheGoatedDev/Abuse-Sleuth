import { prisma } from "@abuse-sleuth/prisma";

export const getUserByID = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            userBillingInfo: true,
        },
    });

    return user;
};
