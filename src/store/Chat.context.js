import React, { useState } from "react";

export const ChatContext = React.createContext({
  talkingTo: {},
  chatStarted: false,
  openChat: () => {},
});

const ChatContextProvider = (props) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [talkTo, setTalkTo] = useState({});

  const open = (obj = null) => {
    // console.log(obj);
    if (!obj) {
      setChatOpen(false);
      return;
    }
    setChatOpen(true);
    setTalkTo(obj);
  };

  return (
    <ChatContext.Provider
      value={{
        openChat: open,
        chatStarted: chatOpen,
        talkingTo: talkTo,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
