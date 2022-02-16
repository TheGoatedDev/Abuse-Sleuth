import axios from "axios";

export const sendAPIAuth = async (
    token: string
): Promise<GenericHTTPResponse> => {
    const webRequest = await axios.post(`/api/auth`, {
        token,
    });

    return webRequest.data;
};

export const getAPIAuthUser = async (): Promise<GenericHTTPResponse> => {
    const webRequest = await axios.get(`/api/auth`);

    return webRequest.data;
};
