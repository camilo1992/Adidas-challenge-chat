import React from "react";
import calsses from "./Avatar.module.css";
import { useContext } from "react";
import { ProfileContext } from "../../store/Profile.context";
function Avatar() {
  const porCtx = useContext(ProfileContext);
  return (
    <div className={calsses.avatarContainer}>
      <div className={calsses.avatar}>{porCtx.profileSelected.user}</div>
    </div>
  );
}

export default Avatar;
