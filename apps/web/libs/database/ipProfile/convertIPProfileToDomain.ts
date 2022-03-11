import { IPProfile, IPProfileDetails } from "@prisma/client";

export const convertIPProfileToDomain = (
    ipProfile: IPProfile & { ipProfileDetails?: IPProfileDetails }
): IPProfileDomainModel => {
    let ipProfileDetailsDomain: IPProfileDetailsDomainModel | undefined;

    if (ipProfile.ipProfileDetails) {
        ipProfileDetailsDomain = {
            id: ipProfile.ipProfileDetails.id,
            countryCode: ipProfile.ipProfileDetails.countryCode,
            privateAddress: ipProfile.ipProfileDetails.privateAddress,
            createdAt: ipProfile.ipProfileDetails.createdAt,
            updatedAt: ipProfile.ipProfileDetails.updatedAt,
        };
    }

    return {
        id: ipProfile.id,

        ipAddress: ipProfile.ipAddress,
        version: ipProfile.version as "4" | "6",
        details: ipProfileDetailsDomain,

        createdAt: ipProfile.createdAt,
        updatedAt: ipProfile.updatedAt,
    };
};
