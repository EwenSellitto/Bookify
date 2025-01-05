import SeachIcon from "./../assets/search.svg";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">BookFinder</div>
      <nav>
        <ul>
          <li>
            <a href="/">Accueil</a>
          </li>
          <li>
            <a href="/my-books">Mes Livres</a>
          </li>
          <li>
            <a href="/recommendations">Recommandations</a>
          </li>
          <li>
            <a href="/profile">Profil</a>
          </li>
        </ul>
      </nav>
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
