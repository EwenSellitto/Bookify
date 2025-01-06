import React from "react";
import { useNavigate } from "react-router-dom";
import "./PopularBook.css";

function PopularBook({ book, index }) {
  const placeholderImage = "https://via.placeholder.com/150";
  const navigate = useNavigate();

  return (
    <div
      key={index}
      className="trending-book-card"
      onClick={() => navigate(`/books/${index}`)}
    >
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

export default PopularBook;
