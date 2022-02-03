import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import logger from "@libs/utils/logger";

if (getApps().length === 0) {
    let firebaseConfig: FirebaseOptions = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };

    if (process.env.NODE_ENV !== "production") {
        logger.info("Firebase Config Running in Development Mode");
        firebaseConfig = {
            apiKey: "dev",
            authDomain: "dev",
            projectId: "abuse-sleuth",
            storageBucket: "dev",
            messagingSenderId: "dev",
            appId: "dev",
            measurementId: "dev",
        };
    } else {
        logger.info("Firebase Config Running in Production Mode");
    }

    const _firebaseApp = initializeApp(firebaseConfig);
}

const firebaseFirestore = getFirestore();
const firebaseAuth = getAuth();
const firebaseStorage = getStorage();

if (process.env.NODE_ENV !== "production") {
    logger.info("Connecting to Firebase Emulator for Firestore");
    connectFirestoreEmulator(firebaseFirestore, "localhost", 9002);
    logger.info("Connecting to Firebase Emulator for Authentication");
    connectAuthEmulator(firebaseAuth, "http://localhost:9001");
    logger.info("Connecting to Firebase Emulator for Storage");
    connectStorageEmulator(firebaseStorage, "localhost", 9002);

    logger.info("Connected to all Firebase Emulators");
}

export { firebaseFirestore, firebaseAuth, firebaseStorage };
