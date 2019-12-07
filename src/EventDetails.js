import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Event from "./Event";
import facade from "./apifacade";

const EventDetails = ({
  match,
  tickets,
  setTickets,
  username,
  handleBookmarks,
  airport
}) => {
  const [eventData, setEventData] = useState(
    <div className="event-box">
      <p>No event found with id {match.params.eventId}</p>
      <Link to="/" className="btn btn-primary">
        Back
      </Link>
    </div>
  );
  let event;
  const [videogameName, setVideogameName] = useState("Not found");
  useEffect(() => {
    facade
      .getSingleEvent(match.params.eventId)
      .then(res => {
        event = res;
      })
      .then(() => {
        // check if found and then generate content
        if (event) {
          setVideogameName(
            event.videogame.name.length > 3
              ? event.videogame.name.toUpperCase()
              : event.videogame.slug
                  .split("-")
                  .join(" ")
                  .toUpperCase()
          );
          setEventData(
            <Event
              event={event}
              returnLink={true}
              tickets={tickets}
              setTickets={setTickets}
              username={username}
              handleBookmarks={handleBookmarks}
              airport={airport}
            />
          );
        }
      });
  }, [match.params.eventId]);

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
