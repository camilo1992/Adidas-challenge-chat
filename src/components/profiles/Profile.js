import React, { useEffect, useState } from "react";
import classes from "./Profile.module.css";
import User from "./User";
import { useContext } from "react";
import { ChatContext } from "../../store/Chat.context";
import { onSnapshot } from "firebase/firestore";
import { connectedRef } from "../../index.js";

function Profile() {
  const chatCtx = useContext(ChatContext);
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    // UPDATES CONNECTED CHAT ON THE UI....
    onSnapshot(connectedRef, (snapshot) => {
      const usersConnectedNow = [];

      snapshot.forEach((doc) => {
        usersConnectedNow.push({ ...doc.data() });
      });
      setConnectedUsers(usersConnectedNow);
    });
  }, []);

  const handleChatStarted = (e) => {
    // OPEnS PRIVATE CHAT
    const talking = connectedUsers.find((element) => {
      return element.name === e.target.textContent;
    });

    if (!talking) {
      return;
    }
    chatCtx.openChat(talking);
  };

  return (
    <div id={classes.profileContainer}>
      {connectedUsers.map((el) => {
        return (
          <User
            onClick={handleChatStarted}
            key={Math.random() * 1}
            user={el.user}
            name={el.name}
          />
        );
      })}
    </div>
  );
}

export default Profile;
