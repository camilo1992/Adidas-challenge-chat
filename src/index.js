import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ProfileContextProvider from "./store/Profile.context";
import ChatContextProvider from "./store/Chat.context";
// Firebase 9 ---> allow us to import only the methods that we need from the service
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // This function inililizes the service
import { collection } from "firebase/firestore"; // This function creates a ref with an specific collection on the database
// import { getDocs } from "firebase/firestore"; // collects the collection in a variable
// import { onSnapshot } from "firebase/firestore"; // Update realtime data...
// import { addDoc } from "firebase/firestore"; // creates new doc ---
import { getAuth, signInAnonymously } from "firebase/auth";

import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDJgLSWv46iSTDLQI6rgxEQEhQt0vJdYo",
  authDomain: "adidas-challenge-3af6d.firebaseapp.com",
  projectId: "adidas-challenge-3af6d",
  storageBucket: "adidas-challenge-3af6d.appspot.com",
  messagingSenderId: "881268475110",
  appId: "1:881268475110:web:aebcaba713ce2731fd2727",
};

// 1. connect app to fire base --- usign obj extracted from the app project on firebase
initializeApp(firebaseConfig);
// 2. Initialize firestore
// now we can use db to reache database from the backend
export const db = getFirestore();

// 3. Gete a reference to our specific collection.
// first arg ---> database extracted in step 3
// second arg ---> name of the collection
export const colRef = collection(db, "messages");
export const connectedRef = collection(db, "connected");
export let messagestedRef;

// const messageRef = doc(db, "rooms", "roomA", "messages", "message1");
// console.log(messagestedRef);

// 4. collect collection  ---> it is represented in an array with every document within the db

//5. authenticatting anonimouslly...
// helps distinguish between sent and recieved msgs
const authObj = getAuth();

signInAnonymously(authObj)
  .then((res) => {
    console.log(res.operationType);
    console.log("user is authenticated");
  })
  .catch((err) => {
    alert(err.message);
  });

// ////////////////////////////////////////////////////////////////////////

export const connectUserAndcreateDocument = async (proCtx, userId) => {
  try {
    const res = await setDoc(doc(db, "connected", userId), {
      author: { ...proCtx.profileSelected },
      connecteddAt: Timestamp.now(),
      userId: userId,
    });
  } catch (err) {
    console.log(err.message);
  }

  messagestedRef = collection(db, "connected", userId, "private-chats");
  // messagestedRef = doc(db, "connected", userId, "private-chats");
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChatContextProvider>
      <ProfileContextProvider>
        <App />
      </ProfileContextProvider>
    </ChatContextProvider>
  </React.StrictMode>
);
