import logger from "@libs/utils/logger";
import admin from "firebase-admin";

if (!admin.apps.length) {
    logger.info("Initializing Firebase Admin SDK");
    if (process.env.NODE_ENV !== "production") {
        logger.info("Firebase Admin SDK Running in Development Mode");
        admin.initializeApp({
            projectId: "abuse-sleuth",
        });
    } else {
        logger.info("Firebase Admin SDK Running in Production Mode");
        try {
            admin.initializeApp({
                credential: admin.credential.cert(
                    JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS as string)
                ),
            });
        } catch (error) {
            logger.error("Error Initializing Firebase Admin SDK:", error);
        }
    }
}

const firebaseAdminAuth = admin.auth();
const firebaseAdminFirestore = admin.firestore();
const firebaseAdminStorage = admin.storage();

export { firebaseAdminAuth, firebaseAdminFirestore, firebaseAdminStorage };
