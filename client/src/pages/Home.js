import React from "react";
import PopularBook from "../components/PopularBook";
import "./Home.css";

function Home({ trendingBooks, categories }) {
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
        <h2>Popular Books</h2>
        <div className="trending-books">
          {trendingBooks.map((book, index) => (
            <PopularBook book={book} index={index} />
          ))}
        </div>
      </div>

      <div className="categories-section">
        <h2>Explore Categories</h2>
        <div className="categories">
          {categories.map((category, index) => (
            <button key={index} className="category-button">
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
