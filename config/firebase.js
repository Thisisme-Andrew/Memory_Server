import admin from "firebase-admin";
import fs from "fs";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// Load Firebase credentials
// var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://memory-47947-default-rtdb.firebaseio.com",
  // storageBucket: "memory-47947.appspot.com"
});

// Export Firebase services for use in other files
const db = admin.firestore();
const auth = admin.auth();
const bucket = admin.storage().bucket();

export { db, auth, bucket };
