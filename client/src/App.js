import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BookDetails from "./pages/BookDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyBooks from "./pages/MyBooks";
import NotFound from "./pages/NotFound";
import Recommendations from "./pages/Recommendations";
import SearchPage from "./pages/SearchPage";
import { AuthProvider } from "./providers/authContext";

function App() {
  const sampleBooks = [
    {
      title: "The Hunger Games: Book 1",
      authors: ["Suzanne Collins"],
      thumbnail: null,
      genres: [
        "Young Adult Fiction",
        "Juvenile Fiction",
        "Television Programs",
      ],
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      authors: ["J.K. Rowling"],
      thumbnail: null,
      genres: ["Fiction", "Fantasy"],
    },
    {
      title: "The Da Vinci Code",
      authors: ["Dan Brown"],
      thumbnail: null,
      genres: ["Fiction", "Mystery"],
    },
    {
      title: "To Kill a Mockingbird",
      authors: ["Harper Lee"],
      thumbnail: null,
      genres: ["Fiction", "Classic"],
    },
    {
      title: "1984",
      authors: ["George Orwell"],
      thumbnail: null,
      genres: ["Fiction", "Dystopian"],
    },
    {
      title: "Pride and Prejudice",
      authors: ["Jane Austen"],
      thumbnail: null,
      genres: ["Fiction", "Romance"],
    },
    {
      title: "The Great Gatsby",
      authors: ["F. Scott Fitzgerald"],
      thumbnail: null,
      genres: ["Fiction", "Classic"],
    },
    {
      title: "Moby Dick",
      authors: ["Herman Melville"],
      thumbnail: null,
      genres: ["Fiction", "Adventure"],
    },
  ];

  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-books" element={<MyBooks />} />
            <Route
              path="/recommendations"
              element={<Recommendations books={sampleBooks} />}
            />
            <Route path="/profile" element={<div>Profile</div>} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/search/:type/:query/:page/:pageSize"
              element={<SearchPage />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
