import Logger from "@libs/utils/Logger";
import createIPProfile from "./createIPProfile";
import getIPProfile from "./getIPProfile";

const createOrGetIPProfile = async (ipAddress: string) => {
    try {
        await createIPProfile(ipAddress);
    } catch (error: any) {
        if (error.code !== 6) {
            Logger.error("createOrGetIPProfile", error);
            throw error;
        }
    }
    return await getIPProfile(ipAddress);
};

export default createOrGetIPProfile;
