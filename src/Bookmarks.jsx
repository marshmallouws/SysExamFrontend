import React, { useEffect, useState } from "react";
import facade from "./apifacade";
import { Link } from "react-router-dom";

const Bookmarks = ({ bookmarks, username }) => {
  const [loadedBookmarks, setLoadedBookmarks] = useState([]);
  useEffect(() => {
    facade.getBookmarks(username).then(res => {
      console.log(res);
      setLoadedBookmarks(res);
    });
  }, [bookmarks]);

  const currentBookmarks =
    loadedBookmarks.length < 1
      ? "Add some bookmarks!"
      : loadedBookmarks.map(bm => (
          <div key={bm.event_id}>
            <Link to={`/details/${bm.event_id}`} className="btn btn-primary">
              Event #{bm.event_id}
            </Link>
          </div>
        ));

  return (
    <div className="sidebar-box">
      <h4>Bookmarks</h4>
      {currentBookmarks}
    </div>
  );
};
export default Bookmarks;
