import React from "react";

const Event = ({ event }) => {
  return (
    <div>
      <p>
        {event.full_name} - {event.league.name}
      </p>
    </div>
  );
};

export default Event;
