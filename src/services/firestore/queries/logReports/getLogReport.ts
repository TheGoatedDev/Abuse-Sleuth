import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";
import FirestoreCollections from "@services/firestore/enums/FirestoreCollections";

const getLogReport = async (logReportID: string) => {
    return await firebaseAdminFirestore
        .collection(FirestoreCollections.LogReports)
        .doc(logReportID)
        .get();
};

export default getLogReport;