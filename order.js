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
