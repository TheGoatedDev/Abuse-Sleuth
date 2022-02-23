import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";
import FirestoreCollections from "@services/firestore/enums/FirestoreCollections";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

const createLogReport = async (user: UserRecord) => {
    return await firebaseAdminFirestore
        .collection(FirestoreCollections.LogReports)
        .add({
            ownerUID: user.uid,
            createdAt: new Date(),
            expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
        });
};

export default createLogReport;
