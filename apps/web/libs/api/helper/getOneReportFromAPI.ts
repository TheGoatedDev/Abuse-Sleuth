import axios from "axios";
import { GenericHTTPResponse } from "types/http";

import { ROUTES } from "@libs/configs/routes";

export const getOneReportFromAPI = async (reportID: string) => {
    const response = await axios.get(ROUTES.api.reports.getSingleReport, {
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
