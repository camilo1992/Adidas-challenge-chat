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
import { getDocs } from "firebase/firestore"; // collects the collection in a variable
// import { onSnapshot } from "firebase/firestore"; // Update realtime data...
import { addDoc } from "firebase/firestore"; // creates new doc ---

import { getAuth, signInAnonymously } from "firebase/auth";

export let userId;
console.log(userId);

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
// 4. collect collection  ---> it is represented in an array with every document within the db

getDocs(colRef)
  .then((snapshot) => {
    const messages = [];
    snapshot.docs.forEach((doc) => {
      messages.push({ ...doc.data(), id: doc.id });
    });
  })
  .catch((err) => {
    alert(err.message);
    console.log(err.message);
  });

// authenticatting anonimouslly...
//  This is gonna help us display a message as a own...
//  if the user leaves the page ... it will be signed out
const authObj = getAuth();
signInAnonymously(authObj)
  .then((res) => {
    // create a collection for wevery authenticated user....
    // this will allow us to store  private chats with every connected user....
    // creatting a collection for every user which will contain differtent documents for every private chat...
    console.log(res);
    userId = res.userId;
    if (res.operationType === "signIn") {
      console.log("user aready exist");
      // If there is already an anonymous user signed in,
      //  that user will be returned; otherwise, a new anonymous user identity will be created and returned.
      // and a new collection will be created to
      return;
    }
    console.log(res.operationType === "signIn");
    // A NEW COLLECTION FOR EVERY USER.
    // IT WILL BE UPDATED WHEN IT STARTS OFF A PRIVATE CHAT
    createNewCollection(res.user.uid);
    userId = res.user.uid;
  })
  .catch((err) => {
    alert(err.message);
  });

// ////////////////////////////////////////////////////////////////////////

const createNewCollection = async (collectionName) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      message: "Second message",
      talkingTo: "xxxxxx",
      time: "timeStamp",
      userId: collectionName,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
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
