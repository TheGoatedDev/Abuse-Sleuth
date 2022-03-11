export const listIPProfiles = async () => {
    const ipProfilesWithDetails = await prisma.iPProfile.findMany({
        include: {
            ipProfileDetails: true,
        },
    });

    return ipProfilesWithDetails;
};

export default listIPProfiles;
