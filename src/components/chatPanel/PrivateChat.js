import React, { useRef, useState } from "react";
import classes from "./PrivateChat.module.css";
import { useContext } from "react";
import { ChatContext } from "../../store/Chat.context";
import { ProfileContext } from "../../store/Profile.context";
import ChatForm from "../../helpers/ChatForm";
import Message from "./Message";
// import Message from "./Message";

function PrivateChat() {
  const message = useRef();
  const chatCtx = useContext(ChatContext);
  const proCtx = useContext(ProfileContext);
  const [displayMessage, setDisplayMessage] = useState([]);

  const messageHandler = (e) => {
    e.preventDefault();
    // Capture message
    console.log(message.current.value);

    setDisplayMessage((prev) => {
      return [
        ...prev,
        { message: message.current.value, user: proCtx.profileSelected.user },
      ];
    });
    console.log(displayMessage);
    // message.current.value = "";
  };

  return (
    <div className={classes.privateChatContainer}>
      <div className={classes.privateChat}>
        <p>Private chat ({chatCtx.talkingTo.name})</p>
        <div className={classes.screen}>
          {displayMessage.map((msg) => {
            return (
              <Message
                key={Math.random() * 1}
                user={msg.user}
                message={msg.message}
              />
            );
          })}
        </div>
        <ChatForm
          form={classes.form}
          textArea={classes.textArea}
          buttonContainer={classes.buttonContainer}
          messageHandler={messageHandler}
          reference={message}
        />
      </div>
    </div>
  );
}

export default PrivateChat;
