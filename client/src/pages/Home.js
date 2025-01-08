import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PopularBook from "../components/PopularBook";
import "./Home.css";

function Home() {
  const [popularBooks, setPopularBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");
  const [requestFailed, setRequestFailed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      const url = "http://localhost:5000/google-books/genres?count=12";

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch genres");
          }
          return response.json();
        });

        const selected = res[Math.floor(Math.random() * res.length)];
        setGenres(res);
        setSelectedGenre(selected);

        return selected;
      } catch (error) {
        console.log(error);
        setRequestFailed(true);
      }
    };

    const fetchPopularBooks = async (selected) => {
      const url = "http://localhost:5000/google-books/search?genre=" + selected;

      try {
        const data = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch popular books");
          }
          return response.json();
        });
        const res = parsePopularBooks(data);

        setPopularBooks(res);

        if (res.length === 0) {
          setRequestFailed(true);
        }
      } catch (error) {
        console.log(error);
        setRequestFailed(true);
      }
    };

    const fetchAll = async () => {
      const selected = await fetchGenres();
      await fetchPopularBooks(selected);
    };

    fetchAll();
  }, []);

  function parsePopularBooks(data) {
    var books = [];
    data.books.splice(0, 6).forEach((book) => {
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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${searchType}/${encodeURIComponent(searchQuery)}/1/10`);
    }
  };

  return (
    <div className="home">
      <div className="search-section">
        <h1>Find Your Next Favorite Book</h1>
        <div className="search-bar-large">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="search-type-dropdown"
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
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="popular-section">
        <h2>Popular {selectedGenre} Books</h2>
        <div className="popular-books">
          {requestFailed ? (
            <div className="loading">No books found</div>
          ) : popularBooks.length > 0 ? (
            popularBooks.map((book, index) => (
              <PopularBook book={book} index={index} />
            ))
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>

      <div className="genres-section">
        <h2>Explore Genres</h2>
        <div className="genres">
          {genres.map((genre, index) => (
            <button
              key={index}
              className="genre-button"
              onClick={() => {
                navigate(`/search/genre/${genre}/1/10`);
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
