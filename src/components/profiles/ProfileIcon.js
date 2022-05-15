import React from "react";
import classes from "./ProfileIcon.module.css";
import { useContext } from "react";
import { ProfileContext } from "../../store/Profile.context";

function ProfileIcon() {
  const proCtx = useContext(ProfileContext);

  return (
    <div className={classes.profileIcon}>{proCtx.profileSelected.user}</div>
  );
}

export default ProfileIcon;
