import logger from "@libs/utils/logger";
import { firebaseFirestore } from "@services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getIPProfile } from "./getIPProfile";

export const createIPProfile = async (ipAddress: string) => {
    logger.info(`Creating IP Profile for ${ipAddress}`);

    try {
        const curDate = new Date();

        const ipProfileDoc = await getIPProfile(ipAddress);
        if (ipProfileDoc.exists()) {
            logger.info(`IP Profile already exists for ${ipAddress}`);
            return ipProfileDoc;
        } else {
            await setDoc(doc(firebaseFirestore, "IPProfiles", ipAddress), {
                lastAccessed: curDate,
                createdAt: curDate,
                updatedAt: curDate,
            });

            const ipProfileDoc = await getIPProfile(ipAddress);

            return ipProfileDoc;
        }
    } catch (error) {
        logger.error(error);
    }
};
