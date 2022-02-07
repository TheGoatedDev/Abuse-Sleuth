import axios from "axios";
import { User } from "firebase/auth";

export const scanLog = async (ipAddresses: string[], user: User) => {
    const webRequest = await axios.post(
        `/api/scanlog`,
        { ipAddresses: ipAddresses },
        {
            headers: {
                Authorization: `Bearer ${await user.getIdToken()}`,
            },
        }
    );

    return webRequest.data;
};
