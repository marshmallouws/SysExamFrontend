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
import Register from "./Register";
import Purchase from "./Purchase";

function App() {
  const [roles, setRoles] = useState([]);

  // const [username, setUsername] = useState("");
  // For debugging
  const [username, setUsername] = useState("");
  const [airport, setAirport] = useState("");

  const logInState = (r, u, a) => {
    setRoles(r);
    setUsername(u);
    setAirport(a);
  };

  const logout = () => {
    setUsername("");
    setAirport("");
    setRoles([]);
  };

  const [events, setEvents] = useState([]); // all events from API call
  const [selected, setSelected] = useState([]); // what to show on page

  const [tickets, setTickets] = useState([]);
  const [updatePurchases, setUpdatePurchases] = useState([]);
  const [updateBookmarks, setUpdateBookmarks] = useState([]);

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

  const handleBookmarks = bookmark => {
    const bookmarkObj = {
      event_id: bookmark,
      user_id: username
    };
    console.log(bookmarkObj);
    facade.saveBookmark(bookmarkObj).then(res => {
      setUpdateBookmarks([]);
    });
  };

  const buyTickets = tickets => {
    facade.buyTickets(tickets).then(res => {
      if (res.length > 0) {
        setTickets([]);
        setUpdatePurchases([]);
      }
    });
  };

  return (
    <Router>
      <Navbar logout={logout} />
      <div className="page-wrapper">
        <div className="row">
          <Switch>
            <Route exact path="/">
              <EventList
                data={selected}
                selecter={handleSelectGameMain}
                bookmarks={updateBookmarks}
                handleBookmarks={handleBookmarks}
                username={username}
              />
              <Sidebar
                tickets={tickets}
                setTickets={setTickets}
                bookmarks={updateBookmarks}
                buyTickets={buyTickets}
                updatePurchases={updatePurchases}
                username={username}
              />
            </Route>

            <Route
              path="/details/:eventId"
              render={props => (
                <React.Fragment>
                  <EventDetails
                    data={events}
                    tickets={tickets}
                    setTickets={setTickets}
                    username={username}
                    bookmarks={updateBookmarks}
                    handleBookmarks={handleBookmarks}
                    airport={airport}
                    {...props}
                  />
                  <Sidebar
                    tickets={tickets}
                    setTickets={setTickets}
                    bookmarks={updateBookmarks}
                    buyTickets={buyTickets}
                    updatePurchases={updatePurchases}
                    username={username}
                  />
                </React.Fragment>
              )}
            />

            <Route
              path="/order/:eventId"
              render={props => (
                <React.Fragment>
                  <Purchase username={username} {...props} />
                  <Sidebar
                    tickets={tickets}
                    setTickets={setTickets}
                    bookmarks={updateBookmarks}
                    buyTickets={buyTickets}
                    updatePurchases={updatePurchases}
                    username={username}
                  />
                </React.Fragment>
              )}
            />

            <Route path="/login">
              <Login logInState={logInState} />
            </Route>
            <Route path="/register">
              <Register facade={facade} logInState={logInState} />
            </Route>
            <PrivateRoute
              path="/user"
              component={LoggedIn}
              roles={roles}
              username={username}
              airport={airport}
            />
          </Switch>
        </div>
      </div>
      <footer>Copyright &copy; 2019 EsportsTraveller</footer>
    </Router>
  );
}

function PrivateRoute({
  component: Component,
  roles,
  username,
  airport,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        facade.getToken() != null ? (
          <Component
            {...props}
            roles={roles}
            username={username}
            airport={airport}
          />
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
  const { roles, username, airport } = props; // TODO add fav airport to props
  const [newAirport, setNewAirport] = useState("");
  const [currFav, setCurrFav] = useState(airport);

  const onChange = e => {
    console.log(e.target.value);
    setNewAirport(e.target.value);
  };

  const onClick = e => {
    e.preventDefault();

    facade.setAirport(username, newAirport);
    setCurrFav(newAirport);
  };

  return (
    <div className="data-wrapper">
      <div className="info-box">
        <h2 className="headline">Set preferred airport</h2>
        <h4>Current airport: {currFav}</h4>
        {console.log(airport)}
        <form onSubmit={onClick} onChange={onChange}>
          <select name="airport">
            <option value="">Choose airport</option>
            <option value="BMA-sky">BMA</option>
            <option value="STOC-sky">STO</option>
            <option value="ARN-sky">ARN</option>
            <option value="NYO-sky">NYO</option>
            <option value="VST-sky">VST</option>
          </select>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
