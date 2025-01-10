import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchSvg from "../assets/search.svg";
import BookCard from "../components/BookCard";
import LoadingSpinner from "../components/LoadingSpinner";
import NoBooksFound from "../components/NoBooksFound";
import fetchServer from "../utils/fetchServer";
import NotFound from "./NotFound";
import "./SearchPage.css";

function SearchPage() {
  const { type, query, page, pageSize } = useParams(); // Get the search query and type from the route
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [searchType, setSearchType] = useState(type);
  const [searchQuery, setSearchQuery] = useState(query);
  const [requestFailed, setRequestFailed] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const url = `google-books/search?${type}=${query}&page=${page}&pageSize=${pageSize}`;

      try {
        const data = await fetchServer(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const res = parseBooks(data);
        setBooks(res);
        setTotalBooks(data.totalBooks);

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
      buylink: book.buylink,
      score: book.score,
    }));
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${searchType}/${encodeURIComponent(searchQuery)}/1/10`);
      navigate(0);
    }
  };

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
      <div className="search-page-bar-large">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="search-page-type-dropdown"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchType}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>
          <img src={SearchSvg} className="search-icon" alt="search" />
        </button>
      </div>
      {books.length === 0 && !requestFailed ? (
        <LoadingSpinner />
      ) : books.length === 0 || requestFailed ? (
        <NoBooksFound />
      ) : (
        <div>
          <Pagination />
          <div className="book-grid">
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
