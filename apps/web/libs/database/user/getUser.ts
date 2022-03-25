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

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            userBillingInfo: true,
        },
    });

    return user;
};

export const getUserByUsername = async (username: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
        include: {
            userBillingInfo: true,
        },
    });

    return user;
};
