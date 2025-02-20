// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const isEasBuild = process.env.EAS_BUILD_PLATFORM !== undefined;
console.log("isEasBuild:", isEasBuild);
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: isEasBuild
    ? process.env.FIREBASE_API_KEY
    : process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: isEasBuild
    ? process.env.FIREBASE_AUTH_DOMAIN
    : process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: isEasBuild
    ? process.env.FIREBASE_PROJECT_ID
    : process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: isEasBuild
    ? process.env.FIREBASE_STORAGE_BUCKET
    : process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: isEasBuild
    ? process.env.FIREBASE_MESSAGING_SENDER_ID
    : process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: isEasBuild
    ? process.env.FIREBASE_APP_ID
    : process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
