import admin from "firebase-admin";
import {getStorage} from "firebase-admin/storage";
import serviceAccount from "../kewi-50876-firebase-adminsdk-fbsvc-3e404d5be9.json" assert {type: "json"};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "fitrack-efd01.appspot.com",
});

const bucket = getStorage().bucket();

export {bucket};
