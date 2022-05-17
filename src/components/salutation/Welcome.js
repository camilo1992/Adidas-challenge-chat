import classes from "./Welcome.module.css";
import Button from "../../helpers/Button";
import { ProfileContext } from "../../store/Profile.context";
import { useContext } from "react";
import "../../App.css";
import { ChatContext } from "../../store/Chat.context";
import { Timestamp, addDoc } from "firebase/firestore";
import { connectedRef } from "../../index";

function Welcome(props) {
  const proCtx = useContext(ProfileContext);
  const chatCtx = useContext(ChatContext);
  const { clicks } = chatCtx;

  const handleClick = () => {
    proCtx.onClick(null, true);
    chatCtx.openChat();
    if (clicks === 0) {
      connectUser();
    }
  };
  // it canbe send just once for every session....

  // CONNECT USER
  const connectUser = () => {
    addDoc(connectedRef, {
      author: { ...proCtx.profileSelected },
      connecteddAt: Timestamp.now(),
      name: proCtx.profileSelected.name,
      user: proCtx.profileSelected.user,
      // userId: userId,
    });
  };

  return (
    <div
      id={
        !proCtx.isProfileSelected
          ? classes.WelcomeContainer
          : classes.WelcomeContainer2
      }
    >
      <p className={classes.welcome}>{props.text}</p>
      <div className={classes.welcomeButton}>
        <Button onClick={handleClick} text="Go chat -->" />
      </div>
    </div>
  );
}

export default Welcome;
