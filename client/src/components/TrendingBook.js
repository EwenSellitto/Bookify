import React from "react";
import "./TrendingBook.css";

function TrendingBook({ book }) {
  const placeholderImage = "https://via.placeholder.com/150";

  return (
    <div className="trending-book-card">
      <img
        src={book.coverImage}
        alt={book.title}
        onError={(e) => (e.target.src = placeholderImage)}
      />
      <div className="trending-book-info">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
      </div>
    </div>
  );
}

export default TrendingBook;
