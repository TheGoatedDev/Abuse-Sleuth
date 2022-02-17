import Logger from "@libs/utils/Logger";
import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";

const createOrGetIPProfile = async (ipAddress: string) => {
    try {
        await firebaseAdminFirestore
            .collection("ipProfiles")
            .doc(ipAddress)
            .create({
                createdAt: new Date(),
            });
    } catch (error) {
        Logger.error("createOrGetIPProfile", error);
    }
    return await firebaseAdminFirestore
        .collection("ipProfiles")
        .doc(ipAddress)
        .get();
};

export default createOrGetIPProfile;
