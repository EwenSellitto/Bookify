import React from "react";
import PopularBook from "../components/PopularBook";
import "./MyBooks.css";

function MyBooks({ books }) {
  return (
    <div className="my-books-page">
      <h1>My Books</h1>
      {books.length > 0 ? (
        <div className="books-grid">
          {books.map((book, index) => (
            <PopularBook book={book} index={index} />
          ))}
        </div>
      ) : (
        <div className="no-books-message">
          <p>You haven't added any books yet.</p>
        </div>
      )}
    </div>
  );
}

export default MyBooks;
