import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/authContext";
import LogoutSvg from "./../assets/logout.svg";
import ProfileIcon from "./../assets/profile.svg";
import "./Header.css";

function Header() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State for profile menu toggle

  const handleLogout = () => {
    auth.logout();
    setIsProfileMenuOpen(false);
    navigate("/login");
  };

  if (!auth.user) {
    return (
      <header className="header">
        <div className="logo">Bookify</div>
      </header>
    );
  }

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
          Bookify
        </div>

        <div className="profile-menu-container">
          <button
            className="profile"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <img src={ProfileIcon} alt="Profile" className="profile-icon" />
          </button>

          {isProfileMenuOpen && (
            <div className="profile-dropdown" onClick={handleLogout}>
              <button className="dropdown-item">Logout</button>
              <img src={LogoutSvg} className="logout-icon" />
            </div>
          )}
        </div>
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
            Bookify
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

        <div className="profile-menu-container">
          <button
            className="profile"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <img src={ProfileIcon} alt="Profile" className="profile-icon" />
          </button>

          {isProfileMenuOpen && (
            <div className="profile-dropdown" onClick={handleLogout}>
              <button className="dropdown-item">Logout</button>
              <img src={LogoutSvg} className="logout-icon" />
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
