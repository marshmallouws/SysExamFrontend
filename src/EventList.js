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
            <th>
              <h2>Events</h2>
            </th>
          </tr>
          <tr>
            <th>
              <div className="eventlist-settings">
                <h6>Advanced Search</h6>
                <div className="form-group">
                  <label htmlFor="gameSelect">Game</label>
                  <select className="form-control" id="gameSelect">
                    <option>All</option>
                    <option>League of Legends</option>
                    <option>Dota 2</option>
                    <option>CS:GO</option>
                    <option>Overwatch</option>
                  </select>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>{events}</tbody>
      </table>
    </div>
  );
};

export default EventList;
