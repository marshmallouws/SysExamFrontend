import React from 'react';
import Event from './Event';

const EventList = ({data}) => {
    return (
        <div>
            <p>{data}</p>
            <table>
                <thead>
                    <th>Event</th>
                </thead>
                <tbody>
                    <tr><Event event="event 1" /></tr>
                    <tr><Event event="event 2" /></tr>
                </tbody>
            </table>
        </div>
    )
}

export default EventList;