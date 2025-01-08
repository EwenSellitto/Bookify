import React from "react";
import { useNavigate } from "react-router-dom";
import BookSvg from "../assets/book.svg";
import "./PopularBook.css";

function PopularBook({ book, index }) {
  const navigate = useNavigate();

  return (
    <div
      key={index}
      className="trending-book-card"
      onClick={() => navigate(`/books/${book.id}`)}
    >
      {book.thumbnail ? (
        <img
          className="thumbnail-img"
          src={book.thumbnail}
          onError={(e) => (e.target.onerror = null)}
        />
      ) : (
        <div className="no-thumbnail">
          <img src={BookSvg} width={25} height={25} />
        </div>
      )}
      <div className="trending-book-info">
        <h3>{book.title}</h3>
        <p>
          {book.authors.length > 1 ? book.authors.join(", ") : book.authors[0]}
        </p>
      </div>
    </div>
  );
}

export default PopularBook;
