import React, { useEffect, useState } from "react";
import PopularBook from "../components/PopularBook";
import "./Home.css";

function Home({ categories }) {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [resquestFailed, setResquestFailed] = useState(false);

  useEffect(() => {
    const fetchTrendingBooks = async () => {
      const selected =
        categories[Math.floor(Math.random() * categories.length)];
      const url = "http://localhost:5000/google-books/search?genre=" + selected;

      try {
        const data = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => response.json());
        var res = parseTrendingBooks(data);

        console.log(res);
        setTrendingBooks(res);
        setSelectedCategory(selected);

        if (res.length === 0) {
          setResquestFailed(true);
        }
      } catch (error) {
        console.log(error);
        setResquestFailed(true);
      }
    };

    fetchTrendingBooks();
  }, []);

  function parseTrendingBooks(data) {
    var books = [];
    data.books.splice(0, 6).forEach((book) => {
      books.push({
        id: book.id,
        title: book.title,
        authors: book.authors,
        coverImage: book.thumbnail,
        genres: book.genre,
      });
    });
    return books;
  }

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
        <h2>Popular {selectedCategory} Books</h2>
        <div className="trending-books">
          {resquestFailed ? (
            <div className="loading">No books found</div>
          ) : trendingBooks.length > 0 ? (
            trendingBooks.map((book, index) => (
              <PopularBook book={book} index={index} />
            ))
          ) : (
            <div className="loading">Loading...</div>
          )}
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
