import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";
import FirestoreCollections from "@services/firestore/enums/FirestoreCollections";

const createLogReportItem = async (
    logReport: LogReport,
    ipProfile: IPProfile
) => {
    return await firebaseAdminFirestore
        .collection(FirestoreCollections.LogReportItems)
        .doc(`${logReport.id}-${ipProfile.ipAddress}`)
        .create({
            ipProfile: ipProfile.ipAddress,
            logReportID: logReport.id,
            createdAt: new Date(),
        });
};

export default createLogReportItem;
