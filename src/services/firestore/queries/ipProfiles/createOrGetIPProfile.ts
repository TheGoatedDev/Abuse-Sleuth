import createIPProfile from "./createIPProfile";
import getIPProfile from "./getIPProfile";

const createOrGetIPProfile = async (ipAddress: string) => {
    try {
        await createIPProfile(ipAddress);
    } catch (error) {
        //Logger.error("createOrGetIPProfile", error);
    }
    return await getIPProfile(ipAddress);
};

export default createOrGetIPProfile;
