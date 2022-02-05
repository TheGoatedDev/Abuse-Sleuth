import { AIPDBScanResult, IPProfile } from "@prisma/client";
import prisma from "@services/database/prismaClient";

const createAIPDBScanResult = async (
    data: IAIPDBScanResultData,
    ipProfile: IPProfile
): Promise<AIPDBScanResult> => {
    return await prisma.aIPDBScanResult.create({
        data: {
            abuseConfidenceScore: data.abuseConfidenceScore,
            countryCode: data.countryCode,
            usageType: data.usageType,
            isp: data.isp,
            domain: data.domain,
            totalReports: data.totalReports,
            numDistinctReporters: data.numDistinctReporters,
            ipProfile: {
                connect: {
                    id: ipProfile.id,
                },
            },
        },
    });
};

export default createAIPDBScanResult;
