import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";

const createIPProfile = async (ipAddress: string) => {
    await firebaseAdminFirestore
        .collection("ipProfiles")
        .doc(ipAddress)
        .create({
            ipAddress: ipAddress,
            createdAt: new Date(),
        });
};

export default createIPProfile;
