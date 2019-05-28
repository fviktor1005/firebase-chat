import React, { useState, useEffect, useRef } from "react";
import {
  getDocsAndSubscribeOnChanges,
  getDocData,
  getDocsData
} from "Modules/Firebase";
import { MessageInput } from "Components/MessageInput";

const ChatScroller = props => {
  const ownRef = useRef();
  useEffect(() => {
    const node = ownRef.current;
    node.scrollTop = node.scrollHeight;
  });
  return <div className="Messages" {...props} ref={ownRef} />;
};

const Messages = ({ channelName }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    return getDocsAndSubscribeOnChanges(
      `channels/${channelName}/messages`,
      docs =>
        setMessages(
          docs.map(doc => {
            const data = doc.data();
            const userId = data.user.id;
            if (!users[userId]) {
              getDocData("users", userId).then(userInfo =>
                setUsers({ ...users, [userId]: userInfo })
              );
            }
            return { ...data, id: doc.id };
          })
        ),
      "createdAt"
    );
  }, [channelName, users]);

  return (
    <ChatScroller>
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, index) => {
        const user = users[message.user.id] || {};
        const previous = messages[index - 1];

        const showDate =
          !previous ||
          new Date(message.createdAt.seconds * 1000).toLocaleDateString() !==
            new Date(previous.createdAt.seconds * 1000).toLocaleDateString();
        const showAvatar =
          showDate || !previous || previous.user.id !== message.user.id;

        return (
          <div key={message.id}>
            {showDate && (
              <div className="Day">
                <div className="DayLine" />
                <div className="DayText">
                  {new Date(
                    message.createdAt.seconds * 1000
                  ).toLocaleDateString()}
                </div>
                <div className="DayLine" />
              </div>
            )}
            <div className="Message with-avatar">
              {showAvatar ? (
                <img className="Avatar" src={user.photoURL} />
              ) : (
                <div className="Avatar" />
              )}
              <div className="Author">
                {showAvatar && (
                  <div>
                    <span className="UserName">{user.displayName} </span>
                    <span className="TimeStamp">
                      {new Date(
                        message.createdAt.seconds * 1000
                      ).toLocaleTimeString()}
                    </span>
                  </div>
                )}
                <div className="MessageContent">{message.text}</div>
              </div>
            </div>
          </div>
        );
      })}
    </ChatScroller>
  );
};

export { Messages };
