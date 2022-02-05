import axios from "axios";
import { User } from "firebase/auth";

const scanIP = async (ipAddress: string, user: User) => {
    const webRequest = await axios.post(
        `/api/scanip`,
        { ipAddress },
        {
            headers: {
                Authorization: `Bearer ${await user.getIdToken()}`,
            },
        }
    );

    return webRequest.data;
};

export default scanIP;
