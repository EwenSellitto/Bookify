import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import LoadingSpinner from "../components/LoadingSpinner";
import NotFound from "./NotFound";
import "./SearchPage.css";

function SearchPage() {
  const { type, query, page, pageSize } = useParams(); // Get the search query and type from the route
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [requestFailed, setRequestFailed] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const url = `http://localhost:5000/google-books/search?${type}=${query}&page=${page}&pageSize=${pageSize}`;

      try {
        const data = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch books");
          }
          return response.json();
        });

        const res = parseBooks(data);
        setBooks(res);
        setTotalBooks(data.totalBooks);

        if (res.length === 0) {
          setRequestFailed(true);
        }
      } catch (error) {
        console.log(error);
        setRequestFailed(true);
      }
    };

    if (isValidPage()) {
      fetchBooks();
    }
  }, [type, query]);

  function parseBooks(data) {
    return data.books.map((book) => ({
      id: book.id,
      title: book.title,
      authors: book.authors,
      thumbnail: book.thumbnail,
      genres: book.genres,
      rating: book.rating,
      ratingcount: book.ratingcount,
      score: book.score,
    }));
  }

  function isValidPage() {
    if (type !== "title" && type !== "author" && type !== "genre") return false;
    if (isNaN(page) || isNaN(pageSize)) return false;
    if (page < 1 || pageSize < 1) return false;
    return true;
  }

  if (!isValidPage()) {
    return <NotFound />;
  }

  return (
    <section className="results">
      <div className="results-header">
        <h2>Results for "{query}"</h2>
      </div>
      {books.length === 0 && !requestFailed ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Pagination />
          <div className="book-grid">
            {requestFailed && <p>No books found</p>}
            {books.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
          <Pagination />
        </div>
      )}
    </section>
  );

  function Pagination() {
    return (
      <div className="pagination">
        <button
          onClick={() => {
            navigate(
              `/search/${type}/${query}/${parseInt(page) - 1}/${pageSize}`
            );
            navigate(0);
          }}
          disabled={parseInt(page) === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(totalBooks / pageSize)}
        </span>
        <button
          onClick={() => {
            navigate(
              `/search/${type}/${query}/${parseInt(page) + 1}/${pageSize}`
            );
            navigate(0);
          }}
          disabled={parseInt(page) * parseInt(pageSize) >= totalBooks}
        >
          Next
        </button>
      </div>
    );
  }
}

export default SearchPage;
