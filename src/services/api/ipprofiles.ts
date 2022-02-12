import { IPProfile } from "@prisma/client";
import axios from "axios";
import { User } from "firebase/auth";

export const getAPIIPProfile = async (
    ipAddress: string,
    user: User
): Promise<IPProfile> => {
    const webRequest = await axios.get(`/api/v1/ipprofiles/${ipAddress}`, {
        headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
        },
    });

    return webRequest.data.data;
};
