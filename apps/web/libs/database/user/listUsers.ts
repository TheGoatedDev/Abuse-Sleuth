export const listUsers = async () => {
    const users = await prisma.user.findMany({});

    return users;
};

export default listUsers;
