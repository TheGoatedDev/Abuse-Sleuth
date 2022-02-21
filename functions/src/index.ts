import * as functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();

export const onUserCreate = functions.auth.user().onCreate((user) => {
    return admin.firestore().collection("users").doc(user.uid).set({
        email: user.email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
});

export const onUserDelete = functions.auth.user().onDelete(async (user) => {
    const batch = admin.firestore().batch();
    const logReportsRef = await admin
        .firestore()
        .collection("logReports")
        .where("ownerUID", "==", user.uid)
        .get();
    await logReportsRef.forEach((logReport) => {
        batch.delete(logReport.ref);
    });
    await batch.commit();
    return admin.firestore().collection("users").doc(user.uid).delete();
});

export const onIPProfileCreate = functions.firestore
    .document("ipProfiles/{ipAddress}")
    .onCreate(async (snapshot) => {
        const ipAddress = snapshot.data().ipAddress;
        return admin.firestore().collection("scanQueue").doc(ipAddress).set({
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    });

export const onLogReportDelete = functions.firestore
    .document("logReports/{id}")
    .onDelete(async (snapshot) => {
        //const batch = admin.firestore().batch();
        const logReportItemsRef = await admin
            .firestore()
            .collection("logReportItems")
            .where("logReportID", "==", snapshot.id)
            .get();
        await logReportItemsRef.forEach((logReportItem) => {
            logReportItem.ref.delete();
        });
        //await batch.commit();
    });
