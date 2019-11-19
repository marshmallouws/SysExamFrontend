import React, { useState, useEffect } from "react";
import facade from "./apifacade";
import { NavLink, Link } from "react-router-dom";

function Navbar(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  const logout = () => {
    facade.logout();
    userHasAuthenticated(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {
    userHasAuthenticated(true);
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
      <nav className="header">
        <ul>
          <li className="logo">
            <img src="./assets/logo.png" />
            <span>ESportsTraveller</span>
          </li>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/user">Roles</NavLink>
          </li>

          {facade.getToken() == null ? (
            <li style={{ float: "right" }}>
              <NavLink to="/login">Login</NavLink>
            </li>
          ) : (
            <li style={{ float: "right" }}>
              <NavLink to="/" onClick={logout}>
                Log out
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    )
  );
}

export default Navbar;
