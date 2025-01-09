import React from "react";
import "./NoBooksFound.css";

function NoBooksFound() {
  return (
    <div className="no-books-found">
      <h2>No Books Found</h2>
      <p>
        Sorry, we couldn't find any books matching your search.
        <br />
        Try checking for typos, using different keywords, or exploring other
        categories.
      </p>
      <button onClick={() => (window.location.href = "/")}>
        Go to Homepage
      </button>
    </div>
  );
}

export default NoBooksFound;
