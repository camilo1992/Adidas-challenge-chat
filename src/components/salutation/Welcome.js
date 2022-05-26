import classes from "./Welcome.module.css";
import "../../App.css";
import Button from "../../helpers/Button";
import { ProfileContext } from "../../store/Profile.context";
import { useContext } from "react";
import { ChatContext } from "../../store/Chat.context";

function Welcome(props) {
  const proCtx = useContext(ProfileContext);
  const chatCtx = useContext(ChatContext);

  const handleClick = () => {
    // UPDATE CONTEXTS
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
      <p
        className={`${
          !proCtx.isProfileSelected ? classes.welcome : classes.p2
        }`}
      >
        {props.text}
      </p>
      <div
        className={`${
          !proCtx.isProfileSelected
            ? classes.welcomeButton
            : classes.welcomeButton2
        }`}
      >
        <Button onClick={handleClick} text="Go chat -->" />
      </div>
    </div>
  );
}

export default Welcome;
