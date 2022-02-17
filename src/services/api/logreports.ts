import axios from "axios";
import { User } from "firebase/auth";

export const getAPILogReports = async (
    user: User
): Promise<GenericHTTPResponse<IAPILogReport[]>> => {
    const webRequest = await axios.get(`/api/v1/logreports`, {
        headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
        },
    });

    return webRequest.data;
};

export const deleteAPILogReport = async (
    id: number,
    user: User
): Promise<GenericHTTPResponse<IAPILogReport[]>> => {
    const webRequest = await axios.delete(`/api/v1/logreports/${id}`, {
        headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
        },
    });

    return webRequest.data;
};

export const getAPILogReportIPProfiles = async (
    id: number,
    user: User
): Promise<GenericHTTPResponse<IPProfile[]>> => {
    const webRequest = await axios.get(`/api/v1/logreports/${id}/ipprofiles`, {
        headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
        },
    });

    return webRequest.data;
};
