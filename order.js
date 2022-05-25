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

// .publicChat {
//     background: linear-gradient(
//       to left,
//       var(--first-colour),
//       var(--second-colour)
//     );
//     /* background-color: var(--first-colour); */

//     height: 73vh;
//     width: 60vw;

//     position: relative;
//     left: 25.5vw;
//     top: -97.5vh;
//     right: 0;
//     margin: 0;
//     display: flex;
//     flex-direction: column;

//     border-radius: 5px;
//     border-top-left-radius: 0;
//     border-bottom-left-radius: 0;
//     opacity: 0.8;

//     z-index: 99;
//     animation: open 2s ease-out;
//   }

//   .messageContainerRecieved {
//     margin: 0;
//     margin-bottom: 15px;
//     margin-right: 0px;
//     margin-top: 3px;
//     display: flex;
//     width: 80%;
//     height: 14%;
//     position: relative;

//     text-align: left;
//     left: 5%;
//     flex-direction: row-reverse;
//     font-size: 2rem;
//   }

//   .messageContainerSent {
//     font-size: 20px;
//     margin: 0;
//     margin-bottom: 15px;
//     margin-right: 0px;
//     margin-top: 3px;
//     display: flex;
//     width: 80%;
//     height: 14%;
//     position: relative;

//     /* text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15); */
//     /* box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15); */

//     text-align: right;
//     left: 16%;
//   }

//   p {
//     font-size: 3rem;
//     margin: 1vh;
//     height: 2vh;
//     margin-left: 10px;
//     font-family: "Audiowide", cursive;
//     color: var(--fourth-colour);
//   }

//   .publicChat2 {
//     background: linear-gradient(
//       to left,
//       var(--first-colour),
//       var(--second-colour)
//     );
//     height: 73vh;
//     width: 40vw;

//     position: relative;
//     left: 25.5vw;
//     top: -97.5vh;
//     right: 0;
//     margin: 0;
//     display: flex;
//     flex-direction: column;

//     border-radius: 5px;
//     opacity: 0.8;

//     z-index: 99;
//     /* animation: shrink 0.4s ease-out; */

//     border-top-left-radius: 0;
//     border-bottom-left-radius: 0;
//   }

//   .screen {
//     position: relative;
//     width: 58vw;
//     height: 48vh;
//     background-color: var(--second-colour);
//     margin: auto;
//     border-radius: 5px;
//     overflow-y: auto;
//     overflow-x: hidden;
//   }

//   .screen::-webkit-scrollbar {
//     display: none;
//   }

//   .buttonContainer {
//     border-radius: 29px;
//     height: 30%;
//     position: relative;
//     width: 14%;
//     top: -7vh;
//     left: 4%;
//     background-color: var(--third-colour);
//   }
//   .form {
//     margin: 0;
//     padding: 0;
//     /* position: relative; */
//   }
//   .textArea {
//     font-size: 100%;
//     font-family: "Audiowide", cursive;
//     color: var(--first-colour);
//     margin-left: 3%;
//     width: 56vw;
//     height: 12vh;
//     position: relative;
//     top: 0.2vh;
//     text-align: right;
//     background-color: var(--second-colour);
//   }

//   @media (max-width: 985px) {
//     .publicChat {
//       width: 80%;
//       left: 2.5vw;
//       top: -27.5vh;
//     }
//     .publicChat2 {
//       width: 80%;
//       left: 2.5vw;
//       top: -27.5vh;
//     }

//     .messageContainerRecieved {
//       font-size: 1.4rem;
//     }
//     .messageContainerSent {
//       font-size: 1.4rem;
//     }
//     .screen {
//       width: 60vw;
//     }
//   }

//   @keyframes open {
//     0% {
//       opacity: 0;
//       transform: translateY(-200%);
//     }

//     100% {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }

//   @keyframes shrink {
//     0% {
//       opacity: 1;
//       transform: scale(0.01, 1);
//     }
//     50% {
//       opacity: 1;
//       transform: scale(0.01, 1);
//     }
//     100% {
//       opacity: 1;
//       transform: scale(1, 1);
//     }
//   }
