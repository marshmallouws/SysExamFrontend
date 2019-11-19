import React from "react";
import Event from "./Event";

const EventList = ({ data }) => {
    console.log(data)
  return (
    <div className="content col-9">
      <p>{data}</p>
      <table>
        <thead>
          <tr>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Event event="event 1" />
            </td>
          </tr>
          <tr>
            <td>
              <Event event="event 2" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
