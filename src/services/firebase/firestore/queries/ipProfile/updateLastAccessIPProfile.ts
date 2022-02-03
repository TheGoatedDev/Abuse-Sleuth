import { firebaseFirestore } from "@services/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const getIPProfile = async (ipAddress: string) => {
    const ipProfileDoc = await updateDoc(
        doc(firebaseFirestore, `IPProfiles`, ipAddress),
        {
            lastAccessed: new Date(),
        }
    );

    return ipProfileDoc;
};
