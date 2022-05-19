import React, { useEffect, useState } from "react";
import classes from "./Profile.module.css";
import User from "./User";
import { useContext } from "react";
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

      // slice array so that we do not display our own avatar.
      setConnectedUsers(usersConnectedNow);
    });
  }, []);

  const handleChatStarted = (e) => {
    // console.log(e.target, "clicked");
    // Starting Chat
    const talking = connectedUsers.find((element) => {
      return element.author.name === e.target.textContent;
    });

    if (!talking) {
      return;
    }
    if (talking.author.name === protCtx.profileSelected.name) {
      return;
    }
    // console.log(talking.userId);
    // let { userId } = talking;

    chatCtx.openChat(talking);
    // create second ref .......
    connectUserAndcreateDocument(talking.userId);
  };

  // console.log(connectedUsers);
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
