import React, { useState, useContext, useRef, useEffect } from "react";
import classes from "./PublicChat.module.css";
import { ProfileContext } from "../../store/Profile.context";
import { ChatContext } from "../../store/Chat.context";
import Message from "./Message";
import ChatForm from "../../helpers/ChatForm";
import { colRef } from "../../index.js";
import { addDoc, Timestamp, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function PublicChat() {
  const chatCtx = useContext(ChatContext);
  const proCtx = useContext(ProfileContext);
  const messageRef = useRef();
  const scrollTagRef = useRef();

  const [displayMessage, setDisplayMessage] = useState([]);
  const [userId, setUserId] = useState();

  // Extract auth obj
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        console.log("singged out");
      }
    });
  }, []);

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

  const connecUser = () => {
    addDoc(connectedRef, {
      // message: messageRef.current.value,
      author: { ...proCtx.profileSelected },
      createdAt: Timestamp.now(),
      userId: userId,
    });
  };
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
    </div>
  );
}

export default PublicChat;
