import React, { useEffect, useState } from "react";
import facade from "./apifacade";
import { Link } from "react-router-dom";

const FlightDetails = ({ event }) => {
  useEffect(() => {}, []);

  return (
    <div className="m-2">
      <h4>Travel</h4>
      <h6>Recommended Flight</h6>
      <p>
        Destination: <strong>{event.location.airport}</strong>
      </p>
    </div>
  );
};
export default FlightDetails;
