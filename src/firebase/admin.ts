import admin from './nodeApp';
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

export { auth, db, storage };
