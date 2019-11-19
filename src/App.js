import React, { useState } from "react";
import facade from "./apifacade";
import Navbar from "./Navbar";
import Login from "./Login";

import EventList from "./EventList";
import Sidebar from "./Sidebar";

import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  const [roles, setRoles] = useState([]);
  const [username, setUsername] = useState("");

  const logInState = (r, u) => {
    setRoles(r);
    setUsername(u);
  };

  const [events, setEvents] = useState([facade.getEvents()]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <div className="page-wrapper">
          <Route exact path="/">
            <EventList data={events} />
            <Sidebar />
          </Route>
          <Route path="/login">
            <Login logInState={logInState} />
          </Route>
          <PrivateRoute
            path="/user"
            component={LoggedIn}
            roles={roles}
            username={username}
          />
        </div>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ component: Component, roles, username, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        facade.getToken() != null ? (
          <Component {...props} roles={roles} username={username} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function LoggedIn(props) {
  const { roles, username } = props;
  return (
    <div className="data-wrapper">
      <div className="info-box">
        <h2 className="headline">Logged in as {username}</h2>
        <h4>Roles:</h4>
        {roles.map((elem, index) => (
          <h5 key={index}>{elem}</h5>
        ))}
      </div>
    </div>
  );
}

export default App;
