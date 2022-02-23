import axios from "axios";

export const getAPILogReports = async (): Promise<
    GenericHTTPResponse<LogReport[]>
> => {
    const webRequest = await axios.get(`/api/v1/logreports`, {});

    return webRequest.data;
};

export const deleteAPILogReport = async (
    reportID: string
): Promise<GenericHTTPResponse<LogReport[]>> => {
    const webRequest = await axios.delete(`/api/v1/logreports/${reportID}`, {});

    return webRequest.data;
};

export const getAPILogReportIPProfiles = async (
    id: number
): Promise<GenericHTTPResponse<IPProfile[]>> => {
    const webRequest = await axios.get(`/api/v1/logreports/${id}/ipprofiles`);

    return webRequest.data;
};
