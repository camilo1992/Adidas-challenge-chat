import React, { useState } from "react";

export const ProfileContext = React.createContext({
  isProfileSelected: false,
  name: "",
  profileSelected: {},
  onClick: () => {},
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
      // Update current profile
      setCurrentProfile(obj);
    } else if (chat) {
      // Move to chat with a default profile
      setClicked((prev) => {
        return !prev;
      });
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        isProfileSelected: clicked,
        onClick: click,
        profileSelected: currentProfile,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
