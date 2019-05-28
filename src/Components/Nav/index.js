import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDocsAndSubscribeOnChanges } from "Modules/Firebase";
import { User } from "Components/User";

export const Nav = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    return getDocsAndSubscribeOnChanges("channels", docs => setChannels(docs));
  }, []);

  return (
    <div className="Nav">
      <User />
      <nav className="ChannelNav">
        {channels.map(channel => (
          <Link key={channel.id} to={`/channel/${channel.id}`}>
            {`# ${channel.id}`}
          </Link>
        ))}
      </nav>
    </div>
  );
};
