import axios from "axios";

export const getReportsFromAPI = async () => {
    const response = await axios.get("/api/reports/");
    const { ok, error, data }: GenericHTTPResponse = response.data;
    if (ok) {
        return data;
    } else {
        throw new Error(error);
    }
};

export default getReportsFromAPI;
