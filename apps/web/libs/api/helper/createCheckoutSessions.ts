import axios from "axios";

export const createCheckoutSessionFromAPI = async (priceID: string) => {
    const response = await axios.post("/api/stripe/checkout_session", {
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
