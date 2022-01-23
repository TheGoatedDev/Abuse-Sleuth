import { AIPDBReport } from "@prisma/client";
import prisma from "../prisma";
import axios from "axios";
import dayjs from "dayjs";

interface Stripped_AIPDB_Report {
    ipAddress: string;
    abuseScore: number;
    country: string;
    usageType: string;
    isp: string;
    domain: string;
    totalReports: number;
    totalDistinctReportee: number;
}

const runAIPDB = async (
    ipAddress: string
): Promise<Stripped_AIPDB_Report | null> => {
    try {
        const res = await axios.get("https://api.abuseipdb.com/api/v2/check", {
            params: {
                ipAddress,
            },
            headers: {
                Accept: "application/json",
                Key: process.env.AIPDB_KEY || "",
            },
        });

        //console.log(res);

        const resData = res.data.data;

        const strippedData: Stripped_AIPDB_Report = {
            ipAddress: resData.ipAddress,
            abuseScore: resData.abuseConfidenceScore,
            country: resData.countryCode,
            usageType: resData.usageType,
            isp: resData.isp,
            domain: resData.domain,
            totalReports: resData.totalReports,
            totalDistinctReportee: resData.numDistinctUsers,
        };

        return strippedData;
    } catch (error) {
        //console.error(error);
        return null;
    }
};

const scanIP = async (
    ipAddress: string,
    ignoreCache: boolean
): Promise<AIPDBReport | null> => {
    if (ignoreCache === false) {
        //console.log("RUNNING CACHE");
        var report = await prisma.aIPDBReport.findFirst({
            where: {
                ipAddress: ipAddress,
            },
        });

        if (report !== null) {
            if (
                dayjs(report.updatedAt) <
                dayjs(report.updatedAt).add(1, "month")
            ) {
                //console.log(ipAddress + " still Valid");
                return report;
            }
        }
    }

    // Run AIPDB to Update or Create Report

    const newReportData = await runAIPDB(ipAddress);
    if (newReportData === null) {
        return null;
    }

    const dbReport = await prisma.aIPDBReport.upsert({
        where: {
            ipAddress,
        },
        update: {
            abuseScore: newReportData.abuseScore,
            country: newReportData.country ?? "Unknown",
            usageType: newReportData.usageType ?? "Unknown",
            isp: newReportData.isp ?? "Unknown",
            domain: newReportData.domain ?? "Unknown",
            totalReports: newReportData.totalReports,
            totalDistinctReportee: newReportData.totalDistinctReportee,
        },
        create: {
            ipAddress: newReportData.ipAddress,
            abuseScore: newReportData.abuseScore,
            country: newReportData.country ?? "Unknown",
            usageType: newReportData.usageType ?? "Unknown",
            isp: newReportData.isp ?? "Unknown",
            domain: newReportData.domain ?? "Unknown",
            totalReports: newReportData.totalReports,
            totalDistinctReportee: newReportData.totalDistinctReportee,
        },
    });

    return dbReport;
};

export { scanIP };
