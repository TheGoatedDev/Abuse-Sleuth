import Logger from "@libs/utils/Logger";
import axios from "axios";

export const makeAIPDBAPIRequest = async (ipAddress: string) => {
    try {
        const webRequest = await axios.get(
            `https://api.abuseipdb.com/api/v2/check`,
            {
                params: {
                    ipAddress: ipAddress,
                    maxAgeInDays: 30,
                },
                headers: {
                    Key: process.env.AIPDB_KEY ?? "",
                },
            }
        );

        const responseData = webRequest.data.data;

        const data: IAIPDBScanResultData = {
            abuseConfidenceScore: responseData.abuseConfidenceScore,
            countryCode: responseData.countryCode,
            usageType: responseData.usageType,
            isp: responseData.isp,
            domain: responseData.domain,
            totalReports: responseData.totalReports,
            numDistinctReporters: responseData.numDistinctUsers,
        };

        return data;
    } catch (error) {
        Logger.error("Abuse IP DB Provider", error);
        throw error;
    }
};
