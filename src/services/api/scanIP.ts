import axios from "axios";

export const scanIP = async (ipAddress: string) => {
    const webRequest = await axios.post(`/api/scanip`, { ipAddress });

    return webRequest.data;
};
