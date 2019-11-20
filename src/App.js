import React, { useState, useEffect } from "react";
import facade from "./apifacade";
import Navbar from "./Navbar";
import Login from "./Login";

import EventList from "./EventList";
import EventDetails from "./EventDetails";
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

  const [events, setEvents] = useState([]); // all events from API call
  const [selected, setSelected] = useState([]); // what to show on page

  useEffect(() => {
    facade.getEvents().then(res => {
      console.log(res);
      setEvents(res);
      setSelected(res);
    });
  }, []);

  // used to filter event when selecting a game
  const handleSelectGameMain = e => {
    const value =
      e.target.dataset.value !== undefined
        ? e.target.dataset.value
        : e.target.value;
    if (value === "reset-all") {
      setSelected(events);
    } else {
      document.getElementById("gameSelect").value = value;
      const filter = events.filter(x => {
        return x.videogame.slug === value;
      });
      setSelected(filter);
    }
  };

  return (
    <Router>
      <Navbar />
      <div className="page-wrapper">
        <div className="row">
          <Switch>
            <Route exact path="/">
              <EventList data={selected} selecter={handleSelectGameMain} />
              <Sidebar />
            </Route>

            <Route
              path="/details/:eventId"
              render={props => (
                <React.Fragment>
                  <EventDetails data={events} {...props} />
                  <Sidebar />
                </React.Fragment>
              )}
            />

            <Route path="/login">
              <Login logInState={logInState} />
            </Route>
            <PrivateRoute
              path="/user"
              component={LoggedIn}
              roles={roles}
              username={username}
            />
          </Switch>
        </div>
      </div>
      <footer>Copyright &copy; 2019 EsportsTraveller</footer>
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
