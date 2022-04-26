import axios from "axios";

import { ROUTES } from "@libs/configs/routes";

export const sendLogToAPI = async (ipAddresses: string[]) => {
    const response = await axios.post(ROUTES.api.scans.scanLogs, {
        ipAddresses,
    });
    const { ok, error, data }: GenericHTTPResponse = response.data;
    if (ok) {
        return data;
    } else {
        throw new Error(error);
    }
};

export default sendLogToAPI;
