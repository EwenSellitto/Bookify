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
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-books" element={<MyBooks />} />
            <Route path="/recommendations" element={<Recommendations />} />
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
