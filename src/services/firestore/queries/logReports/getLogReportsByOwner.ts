import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";
import FirestoreCollections from "@services/firestore/enums/FirestoreCollections";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

const getLogReportsByOwner = async (owner: UserRecord) => {
    return await firebaseAdminFirestore
        .collection(FirestoreCollections.LogReports)
        .where("ownerUID", "==", owner.uid)
        .get();
};

export default getLogReportsByOwner;
