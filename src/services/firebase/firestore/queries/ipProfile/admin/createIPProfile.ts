import { firebaseAdminFirestore } from "@services/firebase/firebaseAdmin";

export const createIPProfile = async (ipAddress: string) => {
    const curDate = new Date();

    firebaseAdminFirestore.collection("IPProfiles").doc(ipAddress).set({
        lastAccessed: curDate,
        createdAt: curDate,
        updatedAt: curDate,
    });
};
