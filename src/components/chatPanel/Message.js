import React from "react";
import classes from "./Message.module.css";
import { useContext } from "react";
import { ProfileContext } from "../../store/Profile.context";
function Message(props) {
  const porCtx = useContext(ProfileContext);

  return (
    <div className={props.className}>
      <div className={classes.message}> {props.message}</div>
      <div className={classes.profileContainer}>
        <div className={classes.profile}>{props.user} </div>
        <div className={classes.name}>{props.name} </div>
        {/* <div className={classes.name}>{porCtx.profileSelected.name} </div> */}
      </div>
    </div>
  );
}

export default Message;
