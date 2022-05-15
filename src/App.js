import Welcome from "./components/salutation/Welcome";
import BackgroundAnimated from "./components/layout/BackgroundAnimated";
import SelectPro from "./components/profiles/SelectPro";
import { title } from "./helpers/data";
import Profile from "./components/profiles/Profile";
import { useContext } from "react";
import { ProfileContext } from "./store/Profile.context";
import PublicChat from "./components/chatPanel/PublicChat";
import Avatar from "./components/profiles/Avatar";
import PrivateChat from "./components/chatPanel/PrivateChat";
import { ChatContext } from "./store/Chat.context";

function App() {
  const proCtx = useContext(ProfileContext);
  const chatCtx = useContext(ChatContext);
  const chat = proCtx.isProfileSelected;
  const chat2 = chatCtx.chatStarted;

  return (
    <div className="App">
      <BackgroundAnimated />
      <SelectPro />
      {chat && <Avatar />}
      <Welcome text={title} />
      {chat && <Profile />}
      {chat && <PublicChat />}
      {chat2 && <PrivateChat />}
    </div>
  );
}

export default App;
