import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./PrivateChat.module.css";
import { ChatContext } from "../../store/Chat.context";
import { ProfileContext } from "../../store/Profile.context";
import ChatForm from "../../helpers/ChatForm";
import Message from "./Message";
import { messagestedRef, privateSentToRef } from "../../index.js";
import { addDoc, onSnapshot, Timestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function PrivateChat() {
  const messageRef = useRef();
  const scrollTagRef = useRef();
  const chatCtx = useContext(ChatContext);
  const proCtx = useContext(ProfileContext);
  const [displayMessage, setDisplayMessage] = useState([]);
  const [userAuthId, setUserAuthId] = useState();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuthId(user.uid);
        console.log(user.uid, " User is  authenticated");
      } else {
        console.log(
          "This means the user is not authenticated anymore, so it is logged out ",
          user
        );
      }
    });
  }, []);

  const messageHandler = (e) => {
    e.preventDefault();

    addDoc(messagestedRef, {
      from: userAuthId,
      to: chatCtx.talkingTo.userId,
      message: messageRef.current.value,
      time: Timestamp.now(),
      user: proCtx.profileSelected.user,
    });

    addDoc(privateSentToRef, {
      from: userAuthId,
      to: chatCtx.talkingTo.userId,
      message: messageRef.current.value,
      time: Timestamp.now(),
      user: proCtx.profileSelected.user,
    });

    scrollTagRef.current.scrollIntoView({ behavior: "smooth" });
    messageRef.current.value = "";
  };

  useEffect(() => {
    onSnapshot(messagestedRef, (snapshot) => {
      const messages = [];

      snapshot.forEach((doc) => {
        let { message, user, from, to } = doc.data();

        // if (from === userAuthId) {
        if (to === chatCtx.talkingTo.userId) {
          messages.push({
            from: from,
            message: message,
            user: user,
            name: chatCtx.talkingTo.name,
            time: doc.data().time.seconds,
            talkingTo: doc.data().from,
          });
        }
        if (from === chatCtx.talkingTo.userId) {
          messages.push({
            from: from,
            message: message,
            user: user,
            name: chatCtx.talkingTo.name,
            time: doc.data().time.seconds,
            talkingTo: doc.data().from,
          });
        }
      });

      messages.sort((a, b) => a.time - b.time);
      setDisplayMessage(messages);
    });
  }, [chatCtx.talkingTo.userId]);
  return (
    <>
      <div className={classes.privateChat}>
        <p>Private chat ({chatCtx.talkingTo.author.name})</p>
        <div className={classes.screen}>
          {displayMessage.map((msg) => (
            <Message
              className={
                userAuthId === msg.from
                  ? classes["messageContainerSent"]
                  : classes["messageContainerRecieved"]
              }
              key={Math.random() * 1}
              user={msg.user}
              name={msg.name}
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

export default PrivateChat;
