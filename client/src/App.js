import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Recommendations from "./pages/Recommendations";

function App() {
  const sampleBooks = [
    {
      title: "The Hunger Games: Book 1",
      author: "Suzanne Collins",
      coverImage: "https://example.com/hunger-games.jpg",
      genres: [
        "Young Adult Fiction",
        "Juvenile Fiction",
        "Television Programs",
      ],
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      coverImage: "https://example.com/harry-potter.jpg",
      genres: ["Fiction", "Fantasy"],
    },
    {
      title: "The Da Vinci Code",
      author: "Dan Brown",
      coverImage: "https://example.com/da-vinci-code.jpg",
      genres: ["Fiction", "Mystery"],
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      coverImage: "https://example.com/to-kill-a-mockingbird.jpg",
      genres: ["Fiction", "Classic"],
    },
    {
      title: "1984",
      author: "George Orwell",
      coverImage: "https://example.com/1984.jpg",
      genres: ["Fiction", "Dystopian"],
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      coverImage: "https://example.com/pride-and-prejudice.jpg",
      genres: ["Fiction", "Romance"],
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImage: "https://example.com/the-great-gatsby.jpg",
      genres: ["Fiction", "Classic"],
    },
    {
      title: "Moby Dick",
      author: "Herman Melville",
      coverImage: "https://example.com/moby-dick.jpg",
      genres: ["Fiction", "Adventure"],
    },
  ];

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Recommendations books={sampleBooks} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
