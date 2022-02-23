import Logger from "@libs/utils/Logger";
import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";
import FirestoreCollections from "@services/firestore/enums/FirestoreCollections";

const createBulkLogReportItems = async (
    logReport: LogReport,
    ipProfiles: IPProfile[]
) => {
    const batches: FirebaseFirestore.WriteBatch[] = [];

    const maxBatchSize = 500;
    const maxBatches = Math.ceil(ipProfiles.length / maxBatchSize);

    for (let i = 0; i < maxBatches; i++) {
        batches.push(firebaseAdminFirestore.batch());
    }

    for (let i = 0; i < ipProfiles.length; i++) {
        const ipProfile = ipProfiles[i];
        const batchIndex = Math.floor(i / maxBatchSize);

        const batch = batches[batchIndex];

        const docRef = await firebaseAdminFirestore
            .collection(FirestoreCollections.LogReportItems)
            .doc(`${logReport.id}-${ipProfile.ipAddress}`);

        batch.create(docRef, {
            ipProfile: ipProfile.ipAddress,
            logReportID: logReport.id,
            createdAt: new Date(),
        });
    }

    Logger.success(
        "createBulkLogReportItems",
        `Creating ~${batches.length} batches of ${maxBatchSize} items`
    );

    return Promise.all(batches.map((batch) => batch.commit()));
};

export default createBulkLogReportItems;
