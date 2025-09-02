import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: 'sareeshine-wmnr1',
  appId: '1:392847502614:web:3ff59ab118d53558ec7437',
  storageBucket: 'sareeshine-wmnr1.appspot.com',
  apiKey: 'AIzaSyBhw5rtlGfUftvSv7vWNRfH4qmmZDLRDbI',
  authDomain: 'sareeshine-wmnr1.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '392847502614',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
