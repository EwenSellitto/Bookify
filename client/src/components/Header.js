import { NavLink, useLocation } from "react-router-dom";
import SeachIcon from "./../assets/search.svg";
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
          <li>
            <NavLink
              to="/profile"
              className={location.pathname === "/profile" ? "active" : ""}
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="logo">BookFinder</div>
      <div className="search-bar">
        <input type="text" placeholder="Rechercher un livre..." />
        <button>
          <img src={SeachIcon} alt="Rechercher" />
        </button>
      </div>
    </header>
  );
}

export default Header;
