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

import { getAuth, signInAnonymously } from "firebase/auth";

// import { query, orderBy } from "firebase/firestore";

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
const db = getFirestore();
// 3. Gete a reference to our specific collection.
// first arg ---> database extracted in step 3
// second arg ---> name of the collection
export const colRef = collection(db, "messages");
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

// 5, create query

// const q = query(colRef, orderBy("createdAt"));

// getDocs(q).then((res) => {
//   res.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     // console.log(doc.data().message);
//   });
// });

// 6. updatting real time data
// export let messages = [];
// onSnapshot(q, (snapshot) => {
//   snapshot.forEach((doc, i) => {
//     messages.push({
//       message: doc.data().message,
//       user: doc.data().user,
//       time: doc.data().createdAt.seconds,
//     });
//   });

//   messages.sort((a, b) => a.time - b.time);
//   // setDisplayMessage(messages);
//   console.log(messages);
// });

// authenticatting anonimouslly...
//  This is gonna help us display a message as a own...
//  if the user leaves the page ... it will be signed out
const authObj = getAuth();
signInAnonymously(authObj)
  .then((res) => {})
  .catch((err) => {
    alert(err.message);
  });

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
