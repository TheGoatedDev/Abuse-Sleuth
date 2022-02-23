import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";
import FirestoreCollections from "@services/firestore/enums/FirestoreCollections";

const getIPProfile = async (ipAddress: string) => {
    return await firebaseAdminFirestore
        .collection(FirestoreCollections.IPProfiles)
        .doc(ipAddress)
        .get();
};

export default getIPProfile;
