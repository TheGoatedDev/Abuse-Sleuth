import * as functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();

exports.onUserCreate = functions.auth.user().onCreate((user) => {
    return admin.firestore().collection("users").doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
