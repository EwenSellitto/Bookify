import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams(); // Get the dynamic id from the route
  const navigate = useNavigate();
  const placeholderImage = "https://via.placeholder.com/150";

  const [book, setBook] = useState({
    title: "",
    authors: [],
    coverImage: "",
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

        console.log(res);

        res.coverImage = res.thumbnail;
        delete res.thumbnail;
        setBook(res);
      } catch (error) {
        console.log(error);
        setResquestFailed(true);
      }
    };

    fetchBook();
  }, []);

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
          <img
            className="book-cover"
            src={book.coverImage}
            alt={book.title}
            onError={(e) => {
              e.target.src = placeholderImage;
            }}
          />
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
            <p>{book.description}</p>
            <div className="book-actions">
              <button className="btn btn-primary">Buy Now</button>
              <button className="btn btn-outline">Add To List</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
