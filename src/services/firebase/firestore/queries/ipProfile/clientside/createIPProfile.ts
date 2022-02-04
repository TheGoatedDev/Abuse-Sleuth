import logger from "@libs/utils/logger";
import { firebaseFirestore } from "@services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getIPProfile } from "../getIPProfile";

export const createIPProfile = async (ipAddress: string) => {
    logger.info(`[Firestore Client] Creating IP Profile for ${ipAddress}`);

    try {
        const curDate = new Date();

        const ipProfileDoc = await getIPProfile(ipAddress, firebaseFirestore);
        if (ipProfileDoc !== null) {
            logger.error(
                `[Firestore Client] IP Profile already exists for ${ipAddress}`
            );
            throw new Error(
                `[Firestore Client] IP Profile already exists for ${ipAddress}`
            );
        }

        await setDoc(doc(firebaseFirestore, "IPProfiles", ipAddress), {
            lastAccessed: curDate,
            createdAt: curDate,
            updatedAt: curDate,
        });
    } catch (error) {
        logger.error(error);
        throw error;
    }
};
