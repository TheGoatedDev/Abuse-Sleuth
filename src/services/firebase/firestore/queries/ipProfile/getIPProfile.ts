import logger from "@libs/utils/logger";
import { doc, Firestore, getDoc } from "firebase/firestore";
import { Firestore as FirestoreAdmin } from "firebase-admin/firestore";

export const getIPProfile = async (
    ipAddress: string,
    firestoreInstance: FirestoreAdmin | Firestore
): Promise<IIPProfile | null> => {
    try {
        logger.info("[Firestore] Getting IP Profile for " + ipAddress);

        let ipProfileDoc;

        if (firestoreInstance instanceof Firestore) {
            //logger.debug("[Firestore Admin] Point Client");
            ipProfileDoc = await getDoc(
                doc(firestoreInstance, `IPProfiles`, ipAddress)
            );
        } else {
            //logger.debug("[Firestore Admin] Point Admin");
            ipProfileDoc = await firestoreInstance
                .collection("IPProfiles")
                .doc(ipAddress)
                .get();
        }

        const data = ipProfileDoc.data();

        //logger.debug("[Firestore Admin] Point 2");

        if (data == undefined) {
            logger.error("[Firestore] No Data, IP Profile for " + ipAddress);
            return null;
        }

        //logger.debug("[Firestore Admin] Point 3");

        logger.info("[Firestore Admin] Got Data, IP Profile for " + ipAddress);
        return {
            ipAddress: ipProfileDoc.id,
            data: {
                lastAccessed: data?.lastAccessed.toDate(),
                createdAt: data?.createdAt.toDate(),
                updatedAt: data?.updatedAt.toDate(),
            },
        };
    } catch (error) {
        logger.error(
            `[Firestore] Error getting IP Profile for ${ipAddress}: ${JSON.stringify(
                error
            )}`
        );
        throw error;
    }
};
