import React, { useEffect, useState } from "react";
import { Messages } from "Components/Messages";
import { MessageInput } from "Components/MessageInput";
import { getDocData } from "Modules/Firebase";

const Channel = ({
  user,
  match: {
    params: { channelName }
  }
}) => {
  const [topic, setTopic] = useState("");
  getDocData("channels", channelName).then(data => setTopic(data.topic));

  return (
    <div className="Channel">
      <div className="ChannelMain">
        <div className="ChannelInfo">
          <div className="Topic">
            Topic: <input className="TopicInput" defaultValue={topic} />
          </div>
          <div className="ChannelName">{channelName}</div>
        </div>
        <Messages channelName={channelName} />
        <MessageInput channelName={channelName} />
      </div>
    </div>
  );
};

export { Channel };
