import React, { useEffect, useState } from "react";
import facade from "./apifacade";
import { Link } from "react-router-dom";

const PurchaseList = ({ purchases, username }) => {
  const [loadedPurchases, setLoadedPurchases] = useState([]);
  useEffect(() => {
    facade.getPurchases(username).then(res => {
      console.log(res);
      setLoadedPurchases(res);
    });
  }, [purchases]);

  const currentPurchases =
    loadedPurchases.length < 1
      ? "No previous orders."
      : loadedPurchases.map(p => (
          <div key={p.series_id}>
            <Link to={`/order/${p.series_id}`} className="btn btn-primary">
              {p.amount}x Order(s) for Event #{p.series_id}
            </Link>
          </div>
        ));

  return (
    <div className="sidebar-box">
      <h4>Order History</h4>
      {currentPurchases}
    </div>
  );
};
export default PurchaseList;
