import React from "react";
import "./NoBooksFound.css";

function NoBooksFound({ isRecomendations = false }) {
  return (
    <div className="no-books-found">
      <h2>No Books Found</h2>
      {isRecomendations ? (
        <p>
          Sorry, we couldn't find any books to recommend for you.
          <br />
          Try adding more books to your collection.
        </p>
      ) : (
        <p>
          Sorry, we couldn't find any books matching your search.
          <br />
          Try checking for typos, using different keywords, or exploring other
          categories.
        </p>
      )}
      <button onClick={() => (window.location.href = "/")}>
        Go to Homepage
      </button>
    </div>
  );
}

export default NoBooksFound;
