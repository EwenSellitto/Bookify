import React from "react";
import TrendingBook from "../components/TrendingBook";
import "./Home.css";

function Home({ trendingBooks }) {
  return (
    <div className="home">
      <div className="search-section">
        <h1>Find Your Next Favorite Book</h1>
        <div className="search-bar-large">
          <input
            type="text"
            placeholder="Search for books, authors, or genres..."
          />
          <button>Search</button>
        </div>
      </div>

      <div className="trending-section">
        <h2>Trending Books</h2>
        <div className="trending-books">
          {trendingBooks.map((book, index) => (
            <TrendingBook book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
