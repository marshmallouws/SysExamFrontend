import React, { useEffect, useState } from "react";
import facade from "./apifacade";
import { Link } from "react-router-dom";

const Purchase = ({ match, username }) => {
  const [purchase, setPurchase] = useState({});
  const event_id = match.params.eventId;
  useEffect(() => {
    facade.getSinglePurchase(username, event_id).then(res => {
      console.log(res);
      setPurchase(res);
    });
  }, [event_id]);

  return (
    <div className="content col-9">
      <table>
        <thead>
          <tr>
            <th>
              <h2>Order for Event #{event_id}</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="event-box">
                <h4>
                  {purchase.amount}x{" "}
                  {purchase.price === undefined ? "ticket" : "flight"} for event
                  #{purchase.series_id}
                </h4>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Purchase;
