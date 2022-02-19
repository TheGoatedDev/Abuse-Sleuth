import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

const createLogReport = async (user: UserRecord) => {
    return await firebaseAdminFirestore.collection("logReports").add({
        ownerUID: user.uid,
        createdAt: new Date(),
    });
};

export default createLogReport;
