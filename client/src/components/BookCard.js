import { useNavigate } from "react-router-dom";
import "./BookCard.css";

function BookCard({ book, index }) {
  const placeholderImage = "https://via.placeholder.com/150";
  const navigate = useNavigate();

  return (
    <div
      key={index}
      className="book-card"
      onClick={() => navigate(`/books/${index}`)}
    >
      <div className="book-card-cover">
        <img
          src={book.thumbnail}
          alt={book.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImage;
          }}
        />
      </div>

      <div>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">
          {book.authors.length > 1 ? book.authors.join(", ") : book.authors[0]}
        </p>

        <div className="book-genres">
          {book.genres.map((genre, index) => (
            <span key={index} className="genre-tag">
              {genre}
            </span>
          ))}
        </div>

        <div className="book-actions">
          <button className="btn btn-primary">Buy Now</button>
          <button className="btn btn-outline">Add To List</button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
