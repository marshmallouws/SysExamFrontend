import React from "react";

const Bookmarks = ({ bookmarks }) => {
  const currentBookmarks =
    bookmarks.length < 1 ? "Add some bookmarks!" : "Bookmarks are here.";

  return (
    <div className="sidebar-box">
      <h4>Bookmarks</h4>
      {currentBookmarks}
    </div>
  );
};
export default Bookmarks;
