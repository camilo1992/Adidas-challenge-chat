import React from "react";
import classes from "./Message.module.css";
function Message(props) {
  return (
    <div className={props.className}>
      <div className={classes.message}> {props.message}</div>
      <div className={classes.profileContainer}>
        <div className={classes.profile}>{props.user} </div>
      </div>
    </div>
  );
}

export default Message;
