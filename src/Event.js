import React from "react";
import { Link } from "react-router-dom";

const Event = ({
  event,
  returnLink,
  selector,
  tickets,
  setTickets,
  username,
  handleBookmarks
}) => {
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

  const ticketObj = {
    sId: event.id,
    username: username,
    amount: 1,
    event_name: event.full_name,
    event_game: event.videogame.slug
  };

  const ticketInformation = returnLink ? (
    <div className="ticket-information">
      <button
        className="btn btn-primary"
        onClick={() => {
          if (tickets.filter(t => t.sId === event.id).length <= 0)
            setTickets([...tickets, ticketObj]);
        }}
      >
        Add to Cart
      </button>
    </div>
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
        <p>{eventTimes}</p>
        <p>{event.tournaments.length} Tournament(s)</p>
        <p>
          Prize Pool:{" "}
          <strong>{event.prizepool == null ? "TBA" : event.prizepool}</strong>
        </p>
        {ticketInformation}

        {link}
        <button
          className="btn btn-secondary"
          onClick={() => {
            handleBookmarks(event.id);
          }}
        >
          Bookmark
        </button>
      </div>
      <div className="clear-floats"></div>
    </div>
  );
};

export default Event;
