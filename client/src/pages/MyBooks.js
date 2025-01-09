import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PopularBook from "../components/PopularBook";
import fetchServer from "../utils/fetchServer";
import "./MyBooks.css";

function MyBooks() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [requestFailed, setRequestFailed] = useState(false);

  useEffect(() => {
    const fetchMyBooks = async () => {
      const url = "user/me";

      try {
        const data = await fetchServer(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = parseBooks(data);

        setBooks(res);

        if (res.length === 0) {
          setRequestFailed(true);
        }
      } catch (error) {
        if (error.message === "Missing credentials") {
          navigate("/login");
          return;
        }
        console.log(error);
        setRequestFailed(true);
      }
    };

    fetchMyBooks();
  }, [navigate]);

  function parseBooks(data) {
    var books = [];
    data.books.forEach((book) => {
      books.push({
        id: book.id,
        title: book.title,
        authors: book.authors,
        thumbnail: book.thumbnail,
        genres: book.genres,
      });
    });
    return books;
  }

  const deleteBook = async (id) => {
    const url = `user/me/books/${id}`;

    try {
      await fetchServer(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newBooks = books.filter((book) => book.id !== id);
      setBooks(newBooks);

      if (newBooks.length === 0) {
        setRequestFailed(true);
      }
    } catch (error) {
      if (error.message === "Missing credentials") {
        navigate("/login");
        return;
      }
      console.log(error);
    }
  };

  return (
    <div className="my-books-page">
      <h1>My Books</h1>
      {requestFailed ? (
        <div>You haven't added any books yet.</div>
      ) : books.length > 0 ? (
        <div className="books-grid">
          {books.map((book, index) => (
            <PopularBook book={book} index={index} onDelete={deleteBook} />
          ))}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default MyBooks;
