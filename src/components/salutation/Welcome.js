import classes from "./Welcome.module.css";
import "../../App.css";
import Button from "../../helpers/Button";
import { ProfileContext } from "../../store/Profile.context";
import { useContext } from "react";
import { ChatContext } from "../../store/Chat.context";
// import { getAuth } from "firebase/auth"
// import { doc, setDoc, Timestamp } from "firebase/firestore";

function Welcome(props) {
  const proCtx = useContext(ProfileContext);
  const chatCtx = useContext(ChatContext);

  const handleClick = () => {
    proCtx.onClick(null, true);
    chatCtx.openChat();
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
