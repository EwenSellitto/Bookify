import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookSvg from "../assets/book.svg";
import LoadingSpinner from "../components/LoadingSpinner";
import "./BookDetails.css";
import NotFound from "./NotFound";

function BookDetails() {
  const { id } = useParams(); // Get the dynamic id from the route
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    authors: [],
    thumbnail: "",
    genres: [],
    description: "",
  });
  const [resquestFailed, setResquestFailed] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      const url = "http://localhost:5000/google-books/book?id=" + id;

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => response.json());

        setBook(res);
      } catch (error) {
        console.log(error);
        setResquestFailed(true);
      }
    };

    fetchBook();
  }, []);

  if (
    book.title == undefined ||
    book.authors == undefined ||
    book.genres == undefined
  ) {
    return <NotFound />;
  }

  if (!book.title) {
    return <LoadingSpinner />;
  }

  return (
    <div className="book-details-page">
      <button onClick={() => navigate(-1)} className="back-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="back-icon"
          viewBox="0 0 24 24"
        >
          <path d="M15 18l-6-6 6-6"></path>
        </svg>
        <span>Go Back</span>
      </button>
      <div className="book-details">
        <div className="book-details-content">
          {book.thumbnail ? (
            <img
              className="book-cover"
              src={book.thumbnail}
              onError={(e) => (e.target.onerror = null)}
            />
          ) : (
            <div className="no-book-cover">
              <img src={BookSvg} width={50} height={50} />
            </div>
          )}
          <div className="book-info">
            <h1>{book.title}</h1>
            <h2>
              By{" "}
              {book.authors.length > 1
                ? book.authors.join(", ")
                : book.authors[0]}
            </h2>
            <div
              className="book-genres"
              style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }}
            >
              {book.genres.map((genre, index) => (
                <span key={index} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>
            <div className="book-actions">
              {book.buylink && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    window.open(book.buylink, "_blank");
                  }}
                >
                  Buy Now
                </button>
              )}
              <button className="btn btn-outline">Add To List</button>
            </div>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
