import React from "react";
import classes from "./Profile.module.css";
import User from "./User";
import { DYUMMY_DATA } from "../../helpers/data";
import { useContext } from "react";
import { ChatContext } from "../../store/Chat.context";

function Profile() {
  const chatCtx = useContext(ChatContext);
  const handleChatStarted = (e) => {
    console.log("cliked");
    // Starting Chat
    const talking = DYUMMY_DATA.find((element) => {
      return element.name === e.target.textContent;
    });

    if (!talking) {
      return;
    }
    chatCtx.openChat(talking);
  };

  return (
    <div id={classes.profileContainer}>
      {DYUMMY_DATA.map((el) => {
        return (
          <User
            onClick={handleChatStarted}
            key={el.key}
            user={el.user}
            name={el.name}
          />
        );
      })}
    </div>
  );
}

export default Profile;
