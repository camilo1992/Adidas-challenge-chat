import React, { useState } from "react";
import { DYUMMY_DATA } from "../helpers/data";

export const ProfileContext = React.createContext({
  isProfileSelected: false,
  name: "",
  profileSelected: {},
  onClick: () => {},
  onChangeName: () => {},
});

// /////////////////////////////////////////////////////////////////////////////////////

const defaultProfile = {
  key: 17,
  user: "🙂",
  name: "Piojo",
  theme: {
    first: "rgb(0, 100, 0)",
    second: "rgb(0, 4, 5)",
    third: "white",
    fourth: "rgb(16, 42, 45)",
  },
};

const ProfileContextProvider = (props) => {
  const [clicked, setClicked] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(defaultProfile);

  const click = (obj = null, chat = false) => {
    if (obj) {
      setCurrentProfile(obj);
    } else if (chat) {
      // Move to chat with a default profile
      setClicked((prev) => {
        return !prev;
      });
    }
  };

  const changeName = (chosenName) => {
    // take current profile and modify name.....

    setCurrentProfile((current) => {
      return { ...current, name: chosenName };
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        isProfileSelected: clicked,
        onClick: click,
        profileSelected: currentProfile,
        onChangeName: changeName,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
