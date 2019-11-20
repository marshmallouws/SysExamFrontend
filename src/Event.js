import React from "react";
import { Link } from "react-router-dom";

const Event = ({ event, returnLink }) => {
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
      Link to Event
    </Link>
  );

  return (
    <div className="event-box">
      <img src={event.league.image_url} alt={event.league.name} />
      <div className="information">
        <div className="game-name">{event.videogame.name.toUpperCase()}</div>
        <h3>
          {event.full_name} - {event.league.name}
        </h3>
        <p>{eventTimes}</p>
        <p>{event.tournaments.length} Tournament(s)</p>
        <p>
          Prize Pool:{" "}
          <strong>{event.prizepool == null ? "TBA" : event.prizepool}</strong>
        </p>

        {link}
      </div>
      <div className="clear-floats"></div>
    </div>
  );
};

export default Event;
