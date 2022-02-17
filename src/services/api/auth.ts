import axios from "axios";
import { User } from "firebase/auth";

export const sendAPIAuth = async (
    token: string
): Promise<GenericHTTPResponse> => {
    const webRequest = await axios.post(`/api/auth`, {
        token,
    });

    return webRequest.data;
};

export const getAPIAuthUser = async (): Promise<GenericHTTPResponse<User>> => {
    const webRequest = await axios.get(`/api/auth`);

    return webRequest.data;
};

export const sendAPIAuthSignOut = async (): Promise<
    GenericHTTPResponse<User>
> => {
    const webRequest = await axios.delete(`/api/auth`);

    return webRequest.data;
};
