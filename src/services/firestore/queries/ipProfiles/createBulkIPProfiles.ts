import Logger from "@libs/utils/Logger";
import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";
import FirestoreCollections from "@services/firestore/enums/FirestoreCollections";

const createBulkIPProfiles = async (ipAddresses: string[]) => {
    const batches: FirebaseFirestore.WriteBatch[] = [];

    const maxBatchSize = 500;
    const maxBatches = Math.ceil(ipAddresses.length / maxBatchSize);

    for (let i = 0; i < maxBatches; i++) {
        batches.push(firebaseAdminFirestore.batch());
    }

    for (let i = 0; i < ipAddresses.length; i++) {
        const ipAddress = ipAddresses[i];
        const batchIndex = Math.floor(i / maxBatchSize);

        const batch = batches[batchIndex];

        const docRef = await firebaseAdminFirestore
            .collection(FirestoreCollections.IPProfiles)
            .doc(ipAddress);

        batch.create(docRef, {
            ipAddress: ipAddress,
            createdAt: new Date(),
        });
    }

    Logger.success(
        "createBulkIPProfiles",
        `Creating ~${batches.length} batches of ${maxBatchSize} items`
    );

    return Promise.all(batches.map((batch) => batch.commit()));
};

export default createBulkIPProfiles;
