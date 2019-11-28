import React, { useState } from "react";
import facade from "./apifacade";
import Bookmarks from "./Bookmarks.jsx";

const Sidebar = ({ tickets, setTickets, bookmarks }) => {
  const cartItems =
    tickets.length < 1
      ? "Add some tickets to your cart!"
      : tickets.map((t, index) => (
          <div className="checkout-item" key={index}>
            <h6>
              {t.event_name}
              <br />
              {t.event_game}
            </h6>
            <p>
              500.00 DKK
              <button
                onClick={() => {
                  setTickets([...tickets.filter(tt => tt.sId !== t.sId)]);
                }}
              >
                X
              </button>
            </p>
            <hr />
          </div>
        ));

  const checkoutBtn =
    tickets.length < 1 ? (
      ""
    ) : (
      <div>
        <p>
          Total: <strong>{tickets.length * 500}.00 DKK</strong>
        </p>
        <button
          onClick={() => {
            facade.buyTickets(tickets);
          }}
          className="btn btn-primary checkout-btn"
        >
          Checkout
        </button>
      </div>
    );

  const cart = (
    <div className="sidebar-box">
      <h4>Ticket Cart</h4>
      {cartItems}
      {checkoutBtn}
    </div>
  );

  return (
    <div className="sidebar col-3">
      {cart}
      <Bookmarks bookmarks={bookmarks} />
    </div>
  );
};

export default Sidebar;
