import { AIPDBProfile } from "@prisma/client";
import prisma from "@services/database/prisma";

export const createAIPDBProfile = async (
    ipAddress: string,
    data: IAIPDBProfileData
): Promise<AIPDBProfile | null> => {
    return await prisma.aIPDBProfile.create({
        data: {
            ipProfile: {
                connectOrCreate: {
                    where: {
                        ipAddress: ipAddress,
                    },
                    create: {
                        ipAddress: ipAddress,
                    },
                },
            },
            abuseScore: data.abuseScore,
            country: data.country,
            usageType: data.usageType,
            isp: data.isp,
            domain: data.domain,
            totalReports: data.totalReports,
            totalDistinctReportee: data.totalDistinctReportee,
        },
    });
};
