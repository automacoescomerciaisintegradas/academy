// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Firebase types may not be available
import { initializeApp, getApps, getApp } from "firebase/app";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Firebase types may not be available
import { getAuth } from "firebase/auth";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Firebase types may not be available
import { getFirestore } from "firebase/firestore";

// Certifique-se de configurar estas variáveis de ambiente no seu .env.local
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
