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
};
