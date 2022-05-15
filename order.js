// const q = query(colRef, orderBy("createdAt"));

// update messages in real time qith useCollectionData
// const [messages2] = useCollectionData(q);

// getDocs(colRef)
//   .then((snapshot) => {
//     snapshot.forEach((doc) => {
//       messages.push({
//         key: doc.id,
//         message: doc.data().message,
//         user: doc.data().author.user,
//       });
//     });

//     console.log(123);
//     // setDisplayMessage(messages);
//   })

//   .catch((err) => {
//     alert(err.message);
//     console.log(err.message);
//   });

// const fetchMessages = useCallback(async () => {
//   const messages = [];
//   try {
//     const res = await getDocs(q);

//     res.forEach((doc) => {
//       messages.push({
//         key: Math.random() * 1,
//         message: doc.data().message,
//         user: doc.data().author.user,
//       });
//     });
//     setDisplayMessage(messages);
//   } catch (err) {
//     alert(err.message);
//   }
// }, [setDisplayMessage]);


  // useEffect(() => {
  //   fetchMessages();
  // }, [fetchMessages]);

