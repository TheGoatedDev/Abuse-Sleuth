import logger from "@libs/utils/logger";
import chalk from "chalk";
import admin from "firebase-admin";

if (!admin.apps.length) {
    logger.info("Initializing Firebase Admin SDK");
    if (process.env.NODE_ENV !== "production") {
        logger.info("Firebase Admin SDK Running in Development Mode");
        logger.info(
            chalk.bgRedBright(
                "Firebase Admin SDK is fucking stupid and can't connect to emulators without ENV variables and also doesn't have the concept of 'localhost'"
            )
        );
        process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "127.0.0.1:9001"; // Firebase Emulator Auth

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

export { firebaseAdminAuth };