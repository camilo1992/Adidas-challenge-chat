import React, { useState } from "react";

export const ChatContext = React.createContext({
  talkingTo: {},
  chatStarted: false,
  openChat: () => {},
  clicks: 0,
});

const ChatContextProvider = (props) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [talkTo, setTalkTo] = useState({});
  const [clicks, setClicks] = useState(0);

  const open = (obj = null) => {
    setClicks((prevClick) => {
      return prevClick + 1;
    });

    !obj && setChatOpen(false);
    obj && setChatOpen(true);
    obj && setTalkTo(obj);
    console.log(obj);
  };

  return (
    <ChatContext.Provider
      value={{
        openChat: open,
        chatStarted: chatOpen,
        talkingTo: talkTo,
        clicks: clicks,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
