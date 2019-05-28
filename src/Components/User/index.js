import React, { useContext } from "react";
import { signUp, logOut } from "Modules/Firebase";
import { UserContext } from "Modules/Context";

export const User = () => {
  const user = useContext(UserContext);

  const onSignUpClick = () => signUp();

  const onLogoutClick = () => logOut();

  return (
    <div className="User">
      {user && <img className="UserImage" alt="whatever" src={user.photoURL} />}
      <div>
        {user && <div>{user.displayName}</div>}
        <div>
          <button
            className="text-button"
            onClick={user ? onLogoutClick : onSignUpClick}
          >
            {user ? "log out" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};
