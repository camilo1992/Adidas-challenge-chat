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
  const [ref, setRef] = useState();

  const open = (obj = null, funcRef = null) => {
    setClicks((prevClick) => {
      return prevClick + 1;
    });

    !obj && !funcRef && setChatOpen(false);

    obj && !funcRef && setChatOpen(true);
    obj && !funcRef && setTalkTo(obj);

    !obj && funcRef && setRef(funcRef);
  };

  return (
    <ChatContext.Provider
      value={{
        openChat: open,
        chatStarted: chatOpen,
        talkingTo: talkTo,
        clicks: clicks,
        createRef: ref,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
