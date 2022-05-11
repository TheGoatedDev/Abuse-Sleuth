import { prisma } from "../../dist";

export const getIPProfiles = prisma.iPProfile.findMany({
    include: {
        ipProfileDetails: true,
    },
});
