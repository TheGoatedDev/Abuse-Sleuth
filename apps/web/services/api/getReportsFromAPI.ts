import axios from "axios";

import { ROUTES } from "@utils/configs/routes";

export const getReportsFromAPI = async () => {
    const response = await axios.get(ROUTES.api.reports.getReports);
    const { ok, error, data }: GenericHTTPResponse = response.data;
    if (ok) {
        return data;
    } else {
        throw new Error(error);
    }
};

export default getReportsFromAPI;
