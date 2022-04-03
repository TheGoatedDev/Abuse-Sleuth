import axios from "axios";

export const getOneReportFromAPI = async (reportID: string) => {
    const response = await axios.get("/api/report/", {
        params: {
            reportID,
        },
    });
    const { ok, error, data }: GenericHTTPResponse = response.data;
    if (ok) {
        return data;
    } else {
        throw new Error(error);
    }
};

export default getOneReportFromAPI;
