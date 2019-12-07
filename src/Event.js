import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlightDetails from "./FlightDetails";
import facade from "./apifacade";

const Event = ({
  event,
  returnLink,
  selector,
  tickets,
  setTickets,
  username,
  handleBookmarks,
  airport
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const beginTime =
    event.begin_at == null
      ? "TBA"
      : event.begin_at.replace("T", " ").replace("Z", "");
  const endTime =
    event.end_at == null
      ? "TBA"
      : event.end_at.replace("T", " ").replace("Z", "");
  const eventTimes = beginTime + " - " + endTime;

  const link = returnLink ? (
    <Link to="/" className="btn btn-primary">
      Back
    </Link>
  ) : (
    <Link to={`details/${event.id}`} className="btn btn-primary">
      Event Information
    </Link>
  );

  const location = returnLink ? (
    <React.Fragment>
      <p>
        Location: {event.location.name}, {event.location.address}
      </p>
      <hr />
    </React.Fragment>
  ) : (
    ""
  );

  const flight = returnLink ? (
    <FlightDetails
      event={event}
      airport={airport}
      username={username}
      tickets={tickets}
      setTickets={setTickets}
    />
  ) : (
    ""
  );

  const ticketObj = {
    sId: event.id,
    username: username,
    amount: 1,
    event_name: event.full_name,
    event_game: event.videogame.slug,
    type: "ticket"
  };

  const ticketInformation = returnLink ? (
    <React.Fragment>
      <div className="ticket-information m-2">
        <h4>Tickets</h4>
        <h6>1x Event Ticket 500.00 DKK</h6>
        <button
          className="btn btn-primary"
          onClick={() => {
            setTickets([...tickets, ticketObj]);
          }}
        >
          Add to Cart
        </button>
      </div>
      <hr />
    </React.Fragment>
  ) : (
    ""
  );

  return (
    <div className="event-box">
      <img src={event.league.image_url} alt={event.league.name} />
      <div className="information">
        <div
          className="game-name"
          data-value={event.videogame.slug}
          onClick={selector}
        >
          {event.videogame.name.toUpperCase()}
        </div>
        <h3>
          {event.full_name} - {event.league.name}
        </h3>
        <p>&nbsp;</p>
        <p>{eventTimes}</p>
        <p>{event.tournaments.length} Tournament(s)</p>
        <p>
          Prize Pool:{" "}
          <strong>{event.prizepool == null ? "TBA" : event.prizepool}</strong>
        </p>
        {location}
        {ticketInformation}
        {flight}
        <div className="event-box-footer">
          <hr />
          {link}
          {facade.getToken() ? (
            <button
              className="btn btn-secondary"
              onClick={() => {
                handleBookmarks(event.id);
              }}
            >
              Bookmark
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="clear-floats"></div>
    </div>
  );
};

export default Event;
