import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ProfileContextProvider from "./store/Profile.context";
import ChatContextProvider from "./store/Chat.context";
// Firebase 9 ---> allow us to import only the methods that we need from the service
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDJgLSWv46iSTDLQI6rgxEQEhQt0vJdYo",
  authDomain: "adidas-challenge-3af6d.firebaseapp.com",
  projectId: "adidas-challenge-3af6d",
  storageBucket: "adidas-challenge-3af6d.appspot.com",
  messagingSenderId: "881268475110",
  appId: "1:881268475110:web:aebcaba713ce2731fd2727",
};

// 1. connect app to fire base
initializeApp(firebaseConfig);
// 2.Connect to db
export const db = getFirestore();

// 3. Gete a reference to our specific collection.
export const colRef = collection(db, "messages");
export const connectedRef = collection(db, "connected");
export let messagestedRef;
export let privateSentToRef;

//5. authenticatting anonymously...
const authObj = getAuth();
// 6. Sign up anonymously
signInAnonymously(authObj)
  .then((res) => {
    console.log(res.operationType);
    console.log("user is authenticated");
  })
  .catch((err) => {
    alert(err.message);
  });

// ////////////////////////////////////////////////////////////////////////
// helpper function to create doc from a ref collection
export const connectUserAndcreateDocument = async (
  talkingToId = null,
  proCtx,
  userId
) => {
  if (proCtx && userId) {
    try {
      await setDoc(doc(db, "connected", userId), {
        author: { ...proCtx.profileSelected },
        connecteddAt: Timestamp.now(),
        userId: userId,
      });
    } catch (err) {
      console.log(err.message);
    }
    messagestedRef = collection(db, "connected", userId, "private-chats");
    // Podiramos agregar un documento aca para inicair la colleccion ?
    // addDoc(messagestedRef, {
    //   message: "Inicio",
    //   time: Timestamp.now(),
    // });
  }

  if (talkingToId) {
    privateSentToRef = collection(
      db,
      "connected",
      talkingToId,
      "private-chats"
    );
  }
};

// /////////////////////////////////////////////
// Helper function to log anonymous user out.
// export const deleteDocWhenUserLogout = async (docName) => {
//   await deleteDoc(doc(db, "connected", docName));
// };
// window.addEventListener("beforeunload", alertUser);
// const alertUser = () => {
//   alert("we are clossing");
// };
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
