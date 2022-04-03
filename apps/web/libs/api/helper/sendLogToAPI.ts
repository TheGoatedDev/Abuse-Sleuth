import axios from "axios";
import { GenericHTTPResponse } from "types/http";

export const sendLogToAPI = async (ipAddresses: string[]) => {
    const response = await axios.post("/api/scan/scanlog", {
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
