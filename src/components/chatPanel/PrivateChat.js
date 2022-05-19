import React, { useEffect, useRef, useState } from "react";
import classes from "./PrivateChat.module.css";
import { useContext } from "react";
import { ChatContext } from "../../store/Chat.context";
import { ProfileContext } from "../../store/Profile.context";
import ChatForm from "../../helpers/ChatForm";
import Message from "./Message";
import { messagestedRef } from "../../index.js";
import { addDoc, onSnapshot, Timestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function PrivateChat() {
  const messageRef = useRef();
  const scrollTagRef = useRef();
  const chatCtx = useContext(ChatContext);
  const proCtx = useContext(ProfileContext);
  const [displayMessage, setDisplayMessage] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    // Distinguish betweeen recieved and sent messages setUserId
    // Create and desplay as connected
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        console.log(user.uid, " User is  authenticated");

        // create doc to store private chats
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
      message: messageRef.current.value,
      talkingTo: chatCtx.talkingTo.userId,
      time: Timestamp.now(),
      // from: proCtx.author.user,
    });

    // scrollTagRef.current.scrollIntoView({ behavior: "smooth" });
    messageRef.current.value = "";
  };

  useEffect(() => {
    onSnapshot(messagestedRef, (snapshot) => {
      const messages = [];

      snapshot.forEach((doc) => {
        let {
          message,
          talkingTo,
          time: { seconds },
        } = doc.data();

        if (talkingTo === chatCtx.talkingTo.userId) {
          messages.push({
            message: message,
            user: chatCtx.talkingTo.user,
            name: chatCtx.talkingTo.name,
            time: seconds,
          });
        }
      });

      messages.sort((a, b) => a.time - b.time);
      setDisplayMessage(messages);
    });
  }, [chatCtx.talkingTo.userId]);

  return (
    <div className={classes.privateChatContainer}>
      <div className={classes.privateChat}>
        <p>Private chat ({chatCtx.talkingTo.author.name})</p>
        <div className={classes.screen}>
          {displayMessage.map((msg) => (
            <Message
              className={
                userId === msg.userId
                  ? classes["messageContainerRecieved"]
                  : classes["messageContainerSent"]
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

export default PrivateChat;
