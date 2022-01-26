import { IPProfile } from "@prisma/client";
import axios from "axios";
import dayjs from "dayjs";
import { generateMockAIPDBData } from "../libs/mock/aipdbMockGen";
import prisma from "../services/database/prisma";
import { log } from "../libs/utils/log";

interface StrippedAIPDBProfile {
    abuseScore: number;
    country: string;
    usageType: string;
    isp: string;
    domain: string;
    totalReports: number;
    totalDistinctReportee: number;
}

// Get the Required Data to make a AIPDB Entry into the DB
const makeWebRequest = async (ipAddress: string) => {
    try {
        let data: any = {};

        // Checks to see if in production to use AIPDB else Generate Mock Data
        if (process.env.NODE_ENV === "production") {
            const res = await axios.get(
                "https://api.abuseipdb.com/api/v2/check",
                {
                    params: {
                        ipAddress,
                    },
                    headers: {
                        Accept: "application/json",
                        Key: process.env.AIPDB_KEY || "",
                    },
                }
            );

            data = res.data.data;
        } else {
            data = generateMockAIPDBData();
        }

        // Condense the data to only what is needed from AIPDB
        const strippedData: StrippedAIPDBProfile = {
            abuseScore: data.abuseConfidenceScore,
            country: data.countryCode ?? "Unknown",
            usageType: data.usageType ?? "Unknown",
            isp: data.isp ?? "Unknown",
            domain: data.domain ?? "Unknown",
            totalReports: data.totalReports,
            totalDistinctReportee: data.numDistinctUsers,
        };

        return strippedData;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
};

// Create a new AIPDB Profile Based on input data and create a IP Profile if it doesn't exist already.
const createNewAIPDBProfile = async (
    data: StrippedAIPDBProfile,
    ipAddress: string
) => {
    await prisma.aIPDBProfile.create({
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

// Updates the AIPDB Profile with input data
const updateAIPDBProfile = async (
    data: StrippedAIPDBProfile,
    ipProfile: IPProfile
) => {
    await prisma.aIPDBProfile.update({
        where: {
            ipProfileId: ipProfile.ipProfileID,
        },
        data: {
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

// Gets the AIPDB Profile from the database
const getAIPDBProfile = async (ipAddress: string) => {
    return await prisma.aIPDBProfile.findFirst({
        where: {
            ipProfile: {
                ipAddress: ipAddress,
            },
        },
    });
};

export const getProfile = async (ipAddress: string) => {
    // Get IP Profile
    const ipProfile = await prisma.iPProfile.findUnique({
        include: {
            aipdbProfile: true,
        },
        where: {
            ipAddress,
        },
    });

    // Check if there is a existing AIPDB Profile
    if (ipProfile?.aipdbProfile) {
        // Has a AIPDB Profile
        // Check if scan is not updated else update it
        if (
            new Date() >
            dayjs(ipProfile.aipdbProfile.updatedAt).add(1, "month").toDate()
        ) {
            log.info(
                `Updating AIPDB Profile #${ipProfile.aipdbProfile.aipdbProfileID} with updated data, it was more than 1 month old`
            );
            await updateAIPDBProfile(
                await makeWebRequest(ipAddress),
                ipProfile
            );
        }
    } else {
        // Create new AIPDB Record
        log.info(`Creating AIPDB Profile for IP ${ipAddress}`);
        const response = await makeWebRequest(ipAddress);
        await createNewAIPDBProfile(response, ipAddress);
    }

    log.info(`Getting AIPDB Profile for IP ${ipAddress}`);
    return getAIPDBProfile(ipAddress);
};
