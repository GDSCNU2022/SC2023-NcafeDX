import * as functions from "firebase-functions";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp({databaseURL:"MY_DATABASE_URL"})

// assign administrator right
exports.addAdminClaim = functions.firestore.document('')