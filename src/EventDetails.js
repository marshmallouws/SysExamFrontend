import React from "react";
import { Link } from "react-router-dom";
import Event from "./Event";

const EventDetails = ({
  match,
  data,
  tickets,
  setTickets,
  username,
  handleBookmarks
}) => {
  var event = data.find(e => e.id == match.params.eventId);
  var eventData;
  let videogameName = "Not found";

  // check if found and then generate content
  if (event) {
    videogameName =
      event.videogame.name.length > 3
        ? event.videogame.name.toUpperCase()
        : event.videogame.slug
            .split("-")
            .join(" ")
            .toUpperCase();
    eventData = (
      <Event
        event={event}
        returnLink={true}
        tickets={tickets}
        setTickets={setTickets}
        username={username}
        handleBookmarks={handleBookmarks}
      />
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
