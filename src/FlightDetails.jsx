import React, { useEffect, useState } from "react";
import facade from "./apifacade";
import { Link } from "react-router-dom";

const FlightDetails = ({ event, airport, username, tickets, setTickets }) => {
  const [flights, setFlights] = useState("");
  useEffect(() => {
    facade
      .getFlights(
        airport,
        event.location.airport_id,
        event.begin_at.split("T")[0]
      )
      .then(res => {
        console.log(res);
        if (res === null) {
          setFlights("No flights found.");
        } else {
          if (res.length > 2) res.length = 2;
          setFlights(
            res.map((f, index) => (
              <div key={index} className="flight-list">
                <p>
                  <strong>
                    #{index + 1} {f.agentsName}
                  </strong>
                </p>
                <p>
                  Departure from {f.startDestination}:{" "}
                  {f.departure.replace("T", " ")}
                </p>
                <p>
                  Arrival at {event.location.airport}:{" "}
                  {f.arrival.replace("T", " ")}
                </p>
                <p>{f.price} DKK</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    const ticketObj = {
                      sId: event.id,
                      username: username,
                      amount: 1,
                      price: f.price,
                      event_name: f.agentsName + ": " + event.full_name,
                      event_game: event.videogame.slug,
                      type: "flight"
                    };
                    setTickets([...tickets, ticketObj]);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))
          );
        }
      });
  }, [event]);

  return (
    <div className="m-2">
      <h4>Travel</h4>
      <h6>Recommended Flights</h6>
      <p>
        Destination: <strong>{event.location.airport}</strong>
      </p>
      {flights}
    </div>
  );
};
export default FlightDetails;
