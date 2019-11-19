import React from 'react';

const EventDetails = ({match, data}) => {
    var event= data.find(e => e.id == match.params.eventId);
    var eventData;
    console.log("@EventDetails")

    if (event) {
        eventData = <div>
            <p>Name: {event.full_name}</p>
            <p>id: {event.id}</p>
        </div>
    } else {
        eventData = <div>
            <p>No event found with id {match.params.eventId}</p>
        </div>
    }
    
    return (
        eventData
    )
}

export default EventDetails;