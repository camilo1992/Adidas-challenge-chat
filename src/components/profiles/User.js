import React from "react";
import classes from "./User.module.css";
function User(props) {
  return (
    <div onClick={props.onClick} className={classes.userContainer}>
      <div className={classes.user}>{props.user}</div>
      <div className={classes.name}>{props.name}</div>
    </div>
  );
}

export default User;
