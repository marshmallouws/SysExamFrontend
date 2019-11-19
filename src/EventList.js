import React from "react";
import Event from "./Event";

const EventList = ({ data }) => {
  const events = data.map((event, index) => (
    <tr key={index}>
      <td>
        <Event event={event} />
      </td>
    </tr>
  ));

  return (
    <div className="content col-9">
      <table>
        <thead>
          <tr>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>{events}</tbody>
      </table>
    </div>
  );
};

export default EventList;
