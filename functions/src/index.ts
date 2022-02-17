import * as functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();

exports.onUserCreate = functions.auth.user().onCreate((user) => {
    return admin.firestore().collection("users").doc(user.uid).set({
        email: user.email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
});

exports.onUserDelete = functions.auth.user().onDelete((user) => {
    return admin.firestore().collection("users").doc(user.uid).delete();
});

exports.onIPProfileCreate = functions.firestore
    .document("ipProfiles/{ipAddress}")
    .onCreate(async (snapshot) => {
        const ipAddress = snapshot.data().ipAddress;
        return admin.firestore().collection("scanQueue").doc(ipAddress).set({
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    });