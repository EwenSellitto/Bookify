import { NavLink, useLocation } from "react-router-dom";
import ProfileIcon from "./../assets/profile.svg";
import "./Header.css";

function Header() {
  const location = useLocation(); // Get the current path

  return (
    <header className="header">
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
  );
}

export default Header;
