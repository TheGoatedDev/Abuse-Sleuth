import { prisma } from "@abuse-sleuth/prisma";

export const listUsers = async () => {
    const users = await prisma.user.findMany({
        include: {
            userBillingInfo: true,
        },
    });

    return users;
};

export default listUsers;
