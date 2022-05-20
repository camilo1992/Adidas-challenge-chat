import React, { useState, useContext, useRef, useEffect } from "react";
import classes from "./PublicChat.module.css";
import { ProfileContext } from "../../store/Profile.context";
import { ChatContext } from "../../store/Chat.context";
import Message from "./Message";
import ChatForm from "../../helpers/ChatForm";
import { addDoc, Timestamp, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  colRef,
  connectUserAndcreateDocument,
  authObj,
  deleteDocWhenUserLogout,
} from "../../index.js";

function PublicChat() {
  const chatCtx = useContext(ChatContext);
  const { clicks } = chatCtx;
  const proCtx = useContext(ProfileContext);
  const messageRef = useRef();
  const scrollTagRef = useRef();

  const [displayMessage, setDisplayMessage] = useState([]);
  const [userId, setUserId] = useState();
  console.log(userId);

  useEffect(() => {
    if (!userId) return;
    function cleanUp(e) {
      signOut(authObj);
      deleteDocWhenUserLogout(userId);

      console.log("hellooww");

      e.returnValue = "";
    }
    window.addEventListener("beforeunload", cleanUp);

    return () => window.removeEventListener("beforeunload", cleanUp);
  }, [userId]);

  useEffect(() => {
    // Create and desplay as connected
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);

        // CREATE REF TO DOC ---> USER CONNECTED
        if (clicks === 1) {
          connectUserAndcreateDocument(null, proCtx, user.uid);
        }
      }
    });
  });

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      const messages = [];

      snapshot.forEach((doc) => {
        let {
          message,
          author: { user, name },
          createdAt: { seconds },
        } = doc.data();

        messages.push({
          message: message,
          user: user,
          name: name,
          time: seconds,
          userId: doc.data().userId,
        });
      });

      messages.sort((a, b) => a.time - b.time);
      setDisplayMessage(messages);
    });
  }, []);

  const messageHandler = (e) => {
    e.preventDefault();

    addDoc(colRef, {
      message: messageRef.current.value,
      author: { ...proCtx.profileSelected },
      createdAt: Timestamp.now(),
      userId: userId,
    });

    scrollTagRef.current.scrollIntoView({ behavior: "smooth" });
    messageRef.current.value = "";
  };

  return (
    <>
      <div
        className={
          !chatCtx.chatStarted ? classes.publicChat : classes.publicChat2
        }
      >
        <p>Public chat</p>
        <div className={classes.screen}>
          {displayMessage.map((msg) => (
            <Message
              className={
                userId === msg.userId
                  ? classes["messageContainerSent"]
                  : classes["messageContainerRecieved"]
              }
              key={Math.random() * 1}
              user={msg.user}
              name={msg.name ? msg.name : proCtx.profileSelected.name}
              message={msg.message}
            />
          ))}

          <span ref={scrollTagRef}></span>
        </div>
        <ChatForm
          form={classes.form}
          textArea={classes.textArea}
          buttonContainer={classes.buttonContainer}
          messageHandler={messageHandler}
          reference={messageRef}
        />
      </div>
    </>
  );
}

export default PublicChat;
