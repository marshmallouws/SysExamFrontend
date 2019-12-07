import React, { useState } from "react";
import Bookmarks from "./Bookmarks.jsx";
import PurchaseList from "./PurchaseList.jsx";

const Sidebar = ({
  tickets,
  setTickets,
  bookmarks,
  username,
  buyTickets,
  updatePurchases
}) => {
  console.log(tickets);
  let totalPrice = 0.0;
  const cartItems =
    tickets.length < 1
      ? "Add something to your cart!"
      : tickets.map((t, index) => (
          <div className="checkout-item" key={index}>
            <h6>
              {t.event_name}
              <br />
              {t.event_game}
            </h6>
            <p>
              1x{" "}
              {t.price === undefined
                ? "Ticket 500.00 DKK"
                : "Flight " + t.price + " DKK"}
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

  if (tickets.length > 0) {
    tickets.forEach(t => {
      totalPrice =
        t.price === undefined
          ? totalPrice + 500.0
          : totalPrice + parseFloat(t.price);
    });
  }

  const checkoutBtn =
    tickets.length < 1 ? (
      ""
    ) : (
      <div>
        <p>
          Total: <strong>{totalPrice} DKK</strong>
        </p>
        <button
          onClick={() => {
            buyTickets(tickets);
          }}
          className="btn btn-primary checkout-btn"
        >
          Checkout
        </button>
      </div>
    );

  const cart = (
    <div className="sidebar-box">
      <h4>Shopping Cart</h4>
      {cartItems}
      {checkoutBtn}
    </div>
  );

  return (
    <div className="sidebar col-3">
      {cart}
      <Bookmarks bookmarks={bookmarks} username={username} />
      <PurchaseList purchases={updatePurchases} username={username} />
    </div>
  );
};

export default Sidebar;
