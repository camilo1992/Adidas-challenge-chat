import React, { useState, useContext, useRef } from "react";
import classes from "./PublicChat.module.css";
import { ProfileContext } from "../../store/Profile.context";
import { ChatContext } from "../../store/Chat.context";
import Message from "./Message";
import ChatForm from "../../helpers/ChatForm";
// import { getDocs,query, orderBy  } from "firebase/firestore";

import { colRef } from "../../index.js";
import { addDoc, Timestamp, onSnapshot } from "firebase/firestore";

//  authentincatin anonimouslly
import { getAuth, onAuthStateChanged } from "firebase/auth";

function PublicChat() {
  const chatCtx = useContext(ChatContext);
  const proCtx = useContext(ProfileContext);
  const messageRef = useRef();

  const [displayMessage, setDisplayMessage] = useState([]);
  const [userId, setUserId] = useState("66FIq69nhybu0seJESUSJlLA6KF2");

  // Extract auth obj
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user.uid);
      setUserId(user.uid);
    } else {
      console.log("singged out");
    }
  });

  onSnapshot(colRef, (snapshot) => {
    const messages = [];

    snapshot.forEach((doc) => {
      let {
        message,
        author: { user },
        createdAt: { seconds },
      } = doc.data();
      messages.push({
        message: message,
        user: user,
        time: seconds,
        userId: doc.data().userId,
      });
    });

    messages.sort((a, b) => a.time - b.time);
    // console.log(messages[0]);

    setDisplayMessage(messages);
    // console.log(messages);
  });

  const messageHandler = (e) => {
    e.preventDefault();

    addDoc(colRef, {
      message: messageRef.current.value,
      author: { ...proCtx.profileSelected },
      createdAt: Timestamp.now(),
      userId: userId,
    });

    // set text area to empty
    messageRef.current.value = "";
  };

  // console.log(displayMessage);
  return (
    <div className={classes.publicChatContainer}>
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
              message={msg.message}
            />
          ))}
        </div>
        <ChatForm
          form={classes.form}
          textArea={classes.textArea}
          buttonContainer={classes.buttonContainer}
          messageHandler={messageHandler}
          reference={messageRef}
        />
      </div>
    </div>
  );
}

export default PublicChat;
