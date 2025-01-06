import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ProfileIcon from "./../assets/profile.svg";
import "./Header.css";

function Header() {
  const location = useLocation(); // Get the current path
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  return (
    <div>
      <header className="desktop-header header">
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-books"
                className={location.pathname === "/my-books" ? "active" : ""}
              >
                My Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/recommendations"
                className={
                  location.pathname === "/recommendations" ? "active" : ""
                }
              >
                Recommendations
              </NavLink>
            </li>
          </ul>
        </nav>

        <div
          className="logo"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          BookFinder
        </div>

        <button
          className="profile"
          onClick={() => {
            window.location.href = "/profile";
          }}
        >
          <img src={ProfileIcon} alt="Profile" className="profile-icon" />
        </button>
      </header>
      <header className="mobile-header header">
        <div className="header-top">
          <button
            className="hamburger-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>

          <div
            className="logo"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            BookFinder
          </div>
        </div>

        <nav className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={location.pathname === "/" ? "active" : ""}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-books"
                className={location.pathname === "/my-books" ? "active" : ""}
                onClick={() => setIsMenuOpen(false)}
              >
                My Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/recommendations"
                className={
                  location.pathname === "/recommendations" ? "active" : ""
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Recommendations
              </NavLink>
            </li>
          </ul>
        </nav>

        <button
          className="profile"
          onClick={() => {
            window.location.href = "/profile";
          }}
        >
          <img src={ProfileIcon} alt="Profile" className="profile-icon" />
        </button>
      </header>
    </div>
  );
}

export default Header;
