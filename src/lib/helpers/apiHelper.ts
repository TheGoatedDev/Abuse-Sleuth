import axios from "axios";
import { GET_AIPDB_Data } from "@lib/types";

export const API_BASE = "/api";

export enum APIVERSION {
    V1 = "v1",
}

export const getCache = async (
    page: number = 1,
    limit: number = 30
): Promise<GET_AIPDB_Data[]> => {
    try {
        const res = await axios.get(API_BASE + "/" + APIVERSION.V1 + "/aipdb", {
            params: {
                page,
                limit,
            },
        });
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
            API_BASE + "/" + APIVERSION.V1 + "/scanlog",
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
