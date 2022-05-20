// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import ProfileContextProvider from "./store/Profile.context";
// import ChatContextProvider from "./store/Chat.context";
// // Firebase 9 ---> allow us to import only the methods that we need from the service
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore"; // This function inililizes the service
// import { collection } from "firebase/firestore"; // This function creates a ref with an specific collection on the database
// // import { getDocs } from "firebase/firestore"; // collects the collection in a variable
// // import { onSnapshot } from "firebase/firestore"; // Update realtime data...
// import { addDoc } from "firebase/firestore"; // creates new doc ---
// import { getAuth, signInAnonymously } from "firebase/auth";

// // import { onAuthStateChanged } from "firebase/auth";
// import { doc, setDoc, Timestamp,deleteDoc } from "firebase/firestore";

// 5, create query

// const q = query(colRef, orderBy("createdAt"));

// getDocs(q).then((res) => {
//   res.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     // console.log(doc.data().message);
//   });
// });

// signOut(authObj)
//   .then((res) => {
//     console.log(res);
//     // delete collection
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// import { doc, deleteDoc } from "firebase/firestore";
// await deleteDoc(doc(db, "cities", "DC"));

// const createUserCollection = () => {
//   const createNewCollection = async (collectionName) => {
//     // CREATE USER'S COLLECTION
//     // IN ORDER TO STORE CHATS
//     try {
//       const docRef = await addDoc(collection(db, collectionName), {
//         message: "THIS IS THE FIRST MESSAGE... TRIAL MESSAGE",
//         talkingTo: "THIS WOULD NEED TO BE the anonimous's id",
//         sentAt: Timestamp.now(),
//         userId: collectionName,
//       });
//       console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   };
// };

// ////////////////////////////////////////////////////////

// setChatOpen(true);
// setTalkTo((prev) => {
//   return { ...prev, ...obj };
// });

// messagestedRef = collection(db, "connected", userId, "private-chats");
// return (userIdTalkingTo) => {
//   collection(db, "connected", userIdTalkingTo, "private-chats");
// };
