import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Nav } from "Components/Nav";
import { Channel } from "Components/Channel";
import { auth, getCurrentUser, subscribeOnAuth } from "Modules/Firebase";
import { UserContext } from "Modules/Context";
import { Messages } from "Components/Messages";

const App = () => {
  const [user, setUser] = useState();
  subscribeOnAuth(user => setUser(user));

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Nav />
          <Route
            exact
            path="/"
            render={() => <Redirect to="/channel/general" />}
          />
          <Route path="/channel/:channelName" component={Channel} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
