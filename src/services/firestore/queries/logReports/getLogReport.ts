import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";

const getLogReport = async (logReportID: string) => {
    return await firebaseAdminFirestore
        .collection("logReports")
        .doc(logReportID)
        .get();
};

export default getLogReport;
