import classes from "./Welcome.module.css";
import "../../App.css";
import Button from "../../helpers/Button";
import { ProfileContext } from "../../store/Profile.context";
import { useContext, useEffect } from "react";
import { ChatContext } from "../../store/Chat.context";
import { connectedRef } from "../../index";
import { getDocs } from "firebase/firestore";

function Welcome(props) {
  const proCtx = useContext(ProfileContext);
  const chatCtx = useContext(ChatContext);
  const chosenNames = [];

  useEffect(() => {
    const getNames = async () => {
      try {
        const querySnapshot = await getDocs(connectedRef);
        querySnapshot.forEach((doc) => {
          chosenNames.push(doc.data().author.name.trim().toLowerCase());
        });
      } catch (err) {
        console.log(err.message);
      }
    };

    getNames();
  });

  const handleClick = () => {
    // CHECK NAMES AVAILABILITY

    if (
      chatCtx.clicks === 0 &&
      chosenNames.includes(proCtx.profileSelected.name)
    ) {
      alert(
        "That name has already been chosen. Please select a different name!"
      );
    } else {
      // UPDATE CONTEXTS
      proCtx.onClick(null, true);
      chatCtx.openChat();
    }
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
