import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import LoadingSpinner from "../components/LoadingSpinner";
import NoBooksFound from "../components/NoBooksFound";
import fetchServer from "../utils/fetchServer";
import "./Recommendations.css";

function Recommendations() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [requestFailed, setRequestFailed] = useState(false);

  useEffect(() => {
    const fetchMyBooks = async () => {
      const url = "user/me/recommendation";

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
  return (
    <section className="recommendations">
      <div className="recommendations-header">
        <h2>Books suggestions for you</h2>
        <p>Based on your reading history</p>
      </div>
      {requestFailed ? (
        <NoBooksFound isRecomendations={true} />
      ) : books.length > 0 ? (
        <div className="book-grid">
          {books.map((book, index) => (
            <BookCard book={book} index={index} />
          ))}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </section>
  );
}

export default Recommendations;
