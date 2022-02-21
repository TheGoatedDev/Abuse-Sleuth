import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";

const createLogReportItem = async (
    logReport: LogReport,
    ipProfile: IPProfile
) => {
    return await firebaseAdminFirestore
        .collection("logReportItems")
        .doc(`${logReport.id}-${ipProfile.ipAddress}`)
        .create({
            ipProfile: ipProfile.ipAddress,
            logReportID: logReport.id,
            createdAt: new Date(),
        });
};

export default createLogReportItem;
