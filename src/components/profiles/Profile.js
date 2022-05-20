import React, {useContext, useEffect, useState } from "react";
import classes from "./Profile.module.css";
import User from "./User";
import { ChatContext } from "../../store/Chat.context";
import { onSnapshot } from "firebase/firestore";
import { connectedRef, connectUserAndcreateDocument } from "../../index.js";
import { ProfileContext } from "../../store/Profile.context";

function Profile() {
  const chatCtx = useContext(ChatContext);
  const protCtx = useContext(ProfileContext);
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    onSnapshot(connectedRef, (snapshot) => {
      const usersConnectedNow = [];
      snapshot.forEach((doc) => {
        let { author, userId } = doc.data();
        usersConnectedNow.push({ author, userId });
      });
      setConnectedUsers(usersConnectedNow);
    });
  }, []);

  const handleChatStarted = (e) => {
    // START CHAT
    const talking = connectedUsers.find((element) => {
      return element.author.name === e.target.textContent;
    });

    if (!talking) {
      return;
    }
    if (talking.author.name === protCtx.profileSelected.name) {
      return;
    }
    chatCtx.openChat(talking);
    
    
    // CREATE SUBCOLLECTION REF .......
    connectUserAndcreateDocument(talking.userId);
  };

  
  return (
    <div id={classes.profileContainer}>
      {connectedUsers.map((el) => {
        return (
          <User
            onClick={handleChatStarted}
            key={Math.random() * 1}
            user={el.author.user}
            name={el.author.name}
          />
        );
      })}
    </div>
  );
}

export default Profile;
