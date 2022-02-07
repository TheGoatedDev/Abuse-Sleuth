import axios from "axios";
import { User } from "firebase/auth";

export const getAPILogReports = async (
    user: User
): Promise<IAPILogReport[]> => {
    const webRequest = await axios.get(`/api/v1/logreports`, {
        headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
        },
    });

    return webRequest.data;
};
