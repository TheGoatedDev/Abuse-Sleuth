import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";
import FirestoreCollections from "@services/firestore/enums/FirestoreCollections";

const createIPProfile = async (ipAddress: string) => {
    return await firebaseAdminFirestore
        .collection(FirestoreCollections.IPProfiles)
        .doc(ipAddress)
        .create({
            ipAddress: ipAddress,
            createdAt: new Date(),
        });
};

export default createIPProfile;
