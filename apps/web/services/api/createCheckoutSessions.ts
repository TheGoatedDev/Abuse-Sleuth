import axios from "axios";

import { ROUTES } from "@utils/configs/routes";

export const createCheckoutSessionFromAPI = async (priceID: string) => {
    const response = await axios.post(ROUTES.api.stripe.createCheckoutSession, {
        priceID: priceID,
    });
    const { ok, error, data }: GenericHTTPResponse = response.data;
    if (ok) {
        return data;
    } else {
        throw new Error(error);
    }
};

export default createCheckoutSessionFromAPI;
