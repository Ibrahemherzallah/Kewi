import admin from "firebase-admin";
import {getStorage} from "firebase-admin/storage";
import serviceAccount from "../fitrack-efd01-d008a835db52.json" assert {type: "json"};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "fitrack-efd01.appspot.com",
});

const bucket = getStorage().bucket();

export {bucket};
