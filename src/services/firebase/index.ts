import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import Logger from "@libs/utils/Logger";

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
        Logger.info(
            "Firebase Client",
            "Firebase Config Running in Development Mode"
        );
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
        Logger.info(
            "Firebase Client",
            "Firebase Config Running in Production Mode"
        );
    }

    const _firebaseApp = initializeApp(firebaseConfig);
}

const firebaseAuth = getAuth();

if (process.env.NODE_ENV !== "production") {
    Logger.info(
        "Firebase Client",
        "Connecting to Firebase Emulator for Authentication"
    );
    connectAuthEmulator(firebaseAuth, "http://localhost:9001");

    Logger.info("Firebase Client", "Connected to all Firebase Emulators");
}

//export { firebaseAuth };
