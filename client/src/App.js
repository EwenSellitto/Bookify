import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BookDetails from "./pages/BookDetails";
import Home from "./pages/Home";
import MyBooks from "./pages/MyBooks";
import NotFound from "./pages/NotFound";
import Recommendations from "./pages/Recommendations";

function App() {
  const sampleBooks = [
    {
      title: "The Hunger Games: Book 1",
      authors: ["Suzanne Collins"],
      thumbnail: "cover",
      genres: [
        "Young Adult Fiction",
        "Juvenile Fiction",
        "Television Programs",
      ],
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      authors: ["J.K. Rowling"],
      thumbnail: "cover",
      genres: ["Fiction", "Fantasy"],
    },
    {
      title: "The Da Vinci Code",
      authors: ["Dan Brown"],
      thumbnail: "cover",
      genres: ["Fiction", "Mystery"],
    },
    {
      title: "To Kill a Mockingbird",
      authors: ["Harper Lee"],
      thumbnail: "cover",
      genres: ["Fiction", "Classic"],
    },
    {
      title: "1984",
      authors: ["George Orwell"],
      thumbnail: "cover",
      genres: ["Fiction", "Dystopian"],
    },
    {
      title: "Pride and Prejudice",
      authors: ["Jane Austen"],
      thumbnail: "cover",
      genres: ["Fiction", "Romance"],
    },
    {
      title: "The Great Gatsby",
      authors: ["F. Scott Fitzgerald"],
      thumbnail: "cover",
      genres: ["Fiction", "Classic"],
    },
    {
      title: "Moby Dick",
      authors: ["Herman Melville"],
      thumbnail: "cover",
      genres: ["Fiction", "Adventure"],
    },
  ];

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/my-books"
            element={<MyBooks books={sampleBooks.slice(0, 4)} />}
          />
          <Route
            path="/recommendations"
            element={<Recommendations books={sampleBooks} />}
          />
          <Route path="/profile" element={<div>Profile</div>} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
