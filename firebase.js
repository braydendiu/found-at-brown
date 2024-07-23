import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB3y2E18DeTg45CwrYPr0l1mAWTzZ1oE9Y",
  authDomain: "found-at-brown.firebaseapp.com",
  databaseURL: "https://found-at-brown-default-rtdb.firebaseio.com",
  projectId: "found-at-brown",
  storageBucket: "found-at-brown.appspot.com",
  messagingSenderId: "703353333726",
  appId: "1:703353333726:web:b21ba4d8caff9353d15f4f",
  measurementId: "G-V44PXH2Q4P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
