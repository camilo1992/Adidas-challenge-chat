import { DYUMMY_DATA } from "../../helpers/data";
import classes from "./SelectPro.module.css";
import User from "./User";
import { ProfileContext } from "../../store/Profile.context";
import { useContext, useState } from "react";
import { ChatContext } from "../../store/Chat.context";

function SelectPro() {
  const proCtx = useContext(ProfileContext);
  const chatCtx = useContext(ChatContext);
  const { clicks } = chatCtx;
  const [name, setName] = useState("");

  const selectPro = (a, b) => {
    document.documentElement.style.setProperty(a, b);
  };

  const hanldeChangeTheme = (e) => {
    // FIND USER SELECTED WIthIN THE USER POOL
    const ele = DYUMMY_DATA.find((element) => {
      return element.user === e.target.textContent;
    });

    // UPDATE USER PROFILE CONTEXT
    proCtx.onClick({ ...ele }, false);
    // STYLE UI
    selectPro("--first-colour", ele.theme.first);
    selectPro("--second-colour", ele.theme.second);
    selectPro("--third-colour", ele.theme.third);
    selectPro("--fourth-colour", ele.theme.fourth);
  };

  const chageNameHandler = (e) => {
    // UPDATE NAME IN UI
    setName(e.target.value);
    // UPDATE USER CONTEXT
    if (e.target.value.trim() === "") {
      proCtx.onChangeName(`nameless ${Math.round(Math.random() * 99)}`);
      return;
    }

    proCtx.onChangeName(e.target.value);
  };

  return (
    <>
      {!proCtx.isProfileSelected && (
        <p className={classes.intro}>
          Select a character 🌏 Change your name 😏 go chat 🚀 ...
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
      {clicks === 0 && !proCtx.isProfileSelected && (
        <p className={classes.intro2}>
          <input
            type="text"
            placeholder={"Type name here"}
            className={classes.changeName}
            onChange={chageNameHandler}
          />
          {name !== "" ? name : proCtx.profileSelected.name}
          {proCtx.profileSelected.user}
        </p>
      )}
    </>
  );
}

export default SelectPro;
