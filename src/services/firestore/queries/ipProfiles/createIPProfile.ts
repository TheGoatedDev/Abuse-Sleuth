import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";
import { Timestamp } from "firebase/firestore";

const createIPProfile = async (ipAddress: string) => {
    await firebaseAdminFirestore
        .collection("ipProfiles")
        .doc(ipAddress)
        .create({
            createdAt: Timestamp.fromDate(new Date()),
        });
};

export default createIPProfile;
