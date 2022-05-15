import React, { useEffect } from "react";
import { DYUMMY_DATA } from "../../helpers/data";
import classes from "./SelectPro.module.css";
import User from "./User";
import { ProfileContext } from "../../store/Profile.context";
import { useContext } from "react";

function SelectPro(props) {
  const proCtx = useContext(ProfileContext);

  const selectPro = (a, b) => {
    document.documentElement.style.setProperty(a, b);
  };

  const hanldeChangeTheme = (e) => {
    const ele = DYUMMY_DATA.find((element) => {
      return element.user === e.target.textContent;
    });

    proCtx.onClick(ele, false); // Sore user selected from Welcome interface

    // proCtx.profileSelected = ele;

    selectPro("--first-colour", ele.theme.first);
    selectPro("--second-colour", ele.theme.second);
    selectPro("--third-colour", ele.theme.third);
    selectPro("--fourth-colour", ele.theme.fourth);
  };

  return (
    <>
      {!proCtx.isProfileSelected && (
        <p className={classes.intro}>
          1. Select a character and start chatting ...
        </p>
      )}
      <div
        className={`${classes.SelectProContainer} ${
          proCtx.isProfileSelected ? classes.fade : ""
        }`}
      >
        {DYUMMY_DATA.map((el) => {
          return (
            <User
              onClick={hanldeChangeTheme}
              key={el.key}
              user={el.user}
              name={el.name}
            />
          );
        })}
      </div>
      {!proCtx.isProfileSelected && (
        <p className={classes.intro2}>
          {proCtx.profileSelected.name}
          {proCtx.profileSelected.user}
        </p>
      )}
    </>
  );
}

export default SelectPro;
