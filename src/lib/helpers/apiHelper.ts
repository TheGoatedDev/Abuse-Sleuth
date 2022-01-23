import { AIPDB_Report } from "@prisma/client";
import axios from "axios";

export const API_BASE = "/api";

export enum API_VERSION {
    VERSION_1 = "v1",
}

export const getCache = async (
    page: number = 1,
    limit: number = 30
): Promise<AIPDB_Report[]> => {
    try {
        const res = await axios.get(
            API_BASE + "/" + API_VERSION.VERSION_1 + "/aipdb",
            {
                params: {
                    page,
                    limit,
                },
            }
        );
        return res.data.data;
    } catch (error) {
        return [];
    }
};

export const sendLog = async (
    ipAddresses: string[],
    generateReport: boolean
): Promise<number> => {
    try {
        const res = await axios.post(
            API_BASE + "/" + API_VERSION.VERSION_1 + "/scanlog",
            {
                ipAddresses: ipAddresses.join(","),
                generateReport,
            }
        );
        return res.data.data;
    } catch (error) {
        return -1;
    }
};
