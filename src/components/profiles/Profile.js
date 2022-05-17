import React, { useEffect, useState } from "react";
import classes from "./Profile.module.css";
import User from "./User";
import { DYUMMY_DATA } from "../../helpers/data";
import { useContext } from "react";
import { ChatContext } from "../../store/Chat.context";
import { onSnapshot } from "firebase/firestore";
import { connectedRef } from "../../index.js";

function Profile() {
  const chatCtx = useContext(ChatContext);
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    onSnapshot(connectedRef, (snapshot) => {
      const usersConnectedNow = [];
      // messages.push(snapshot);
      // setConnectedUsers(usersConnectedNow);
      snapshot.forEach((doc) => {
        usersConnectedNow.push({ ...doc.data() });
      });
      setConnectedUsers(usersConnectedNow);
    });
  }, []);

  const handleChatStarted = (e) => {
    // Starting Chat
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
