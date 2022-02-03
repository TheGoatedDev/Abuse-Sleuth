import { firebaseFirestore } from "@services/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getIPProfile = async (ipAddress: string) => {
    const ipProfileDoc = await getDoc(
        doc(firebaseFirestore, `IPProfiles`, ipAddress)
    );

    return ipProfileDoc;
};
