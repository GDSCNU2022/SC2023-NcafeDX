// @ts-nocheck
// firebase functions can't read type definitions with ':'.

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({
  databaseURL: "https://gdsc-nu-sc2023-default-rtdb.firebaseio.com",
});

/* USAGE in your arbitrary page
firebase.auth().onAuthStateChanged((user) => {
  
  // call getIdTokenResult()
  user.getIdTokenResult(true).then((idTokenResult) => {
    if (idTokenResult.claims.admin) {
      commit("userRights");
    }
  })
})
*/

const modifyAdmin = (uid, isAdmin) => {
  admin.auth().setCustomUserClaims(uid, { admin: isAdmin }).then();
};

// assign administrator right
exports.addAdminClaim = functions.firestore
  .document("admin_users/{docID}")
  .onCreate((snap) => {
    const newAdminUser = snap.data();
    if (newAdminUser === undefined) {
      return;
    }
    modifyAdmin(newAdminUser.uid, true);
  });

exports.removeAdminClaim = functions.firestore
  .document("admin_users/{docID}")
  .onDelete((snap) => {
    const deletedAdminUser = snap.data();
    if (deletedAdminUser === undefined) {
      return;
    }
    modifyAdmin(deletedAdminUser.uid, false);
  });
