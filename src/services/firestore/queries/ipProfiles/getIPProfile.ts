import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";

const getIPProfile = async (ipAddress: string) => {
    return await firebaseAdminFirestore
        .collection("ipProfiles")
        .doc(ipAddress)
        .get();
};

export default getIPProfile;
