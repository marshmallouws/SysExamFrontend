import React from "react";
import { Link } from "react-router-dom";

const EventDetails = ({ match, data }) => {
  var event = data.find(e => e.id === match.params.eventId);
  var eventData;

  const videogameName =
    event.videogame.name.length > 3
      ? event.videogame.name.toUpperCase()
      : event.videogame.slug
          .split("-")
          .join(" ")
          .toUpperCase();
  // check if found and then generate content
  if (event) {
    // code from Event.js
    const beginTime =
      event.begin_at === null
        ? "TBA"
        : event.begin_at.replace("T", " ").replace("Z", "");
    const endTime =
      event.end_at === null
        ? "TBA"
        : event.end_at.replace("T", " ").replace("Z", "");
    const eventTimes = beginTime + " - " + endTime;

    eventData = (
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
            <strong>
              {event.prizepool === null ? "TBA" : event.prizepool}
            </strong>
          </p>
        </div>
        <div className="clear-floats"></div>
        <Link to="/" className="btn btn-primary">
          Back
        </Link>
      </div>
    );
  } else {
    eventData = (
      <div className="event-box">
        <p>No event found with id {match.params.eventId}</p>
        <Link to="/" className="btn btn-primary">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="content col-9">
      <table>
        <thead>
          <tr>
            <th>
              <h2>{videogameName}</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{eventData}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventDetails;
