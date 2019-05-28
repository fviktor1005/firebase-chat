import React, { useState, useContext } from "react";
import { getCollection, sendMessage, signUp } from "Modules/Firebase";
import { UserContext } from "Modules/Context";

export const MessageInput = ({ channelName }) => {
  const [text, setText] = useState("");
  const user = useContext(UserContext);

  const onSubmit = event => {
    event.preventDefault();
    if (user) {
      sendMessage(user, channelName, text);
      setText("");
    } else {
      signUp().then(result => {
        sendMessage(result.user, channelName, text);
        setText("");
      });
    }
  };

  const onChange = e => setText(e.target.value);

  return (
    <form onSubmit={onSubmit} className="ChatInputBox">
      <input
        autocomplete="off"
        name="input-message"
        className="ChatInput"
        placeholder="Message #general"
        value={text}
        onChange={onChange}
      />
    </form>
  );
};
