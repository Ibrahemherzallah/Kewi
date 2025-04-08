import admin from "firebase-admin";
import {getStorage} from "firebase-admin/storage";
import serviceAccount from "../fitrack-efd01-firebase-adminsdk-4xg0u-3d4116ac1a.json" assert {type: "json"};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "fitrack-efd01.appspot.com",
});

const bucket = getStorage().bucket();

export {bucket};
