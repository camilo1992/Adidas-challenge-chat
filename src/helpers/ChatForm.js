import React from "react";
import Button from "./Button";

function ChatForm(props) {
  return (
    <form onSubmit={props.messageHandler} className={props.form}>
      <input
        type="text"
        className={props.textArea}
        placeholder="Start typping..."
        ref={props.reference}
      ></input>
      <div className={props.buttonContainer}>
        <Button text="Send"></Button>
      </div>
    </form>
  );
}

export default ChatForm;
