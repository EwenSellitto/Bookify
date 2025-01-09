import { useNavigate } from "react-router-dom";
import BookSvg from "../assets/book.svg";
import fetchServer from "../utils/fetchServer";
import "./BookCard.css";

function BookCard({ book, index }) {
  const navigate = useNavigate();

  const addBookToList = async () => {
    const url = "user/me/book";

    try {
      await fetchServer(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cUnLivreTqtId: book.id }),
      });
    } catch (error) {
      if (error.message === "Missing credentials") {
        navigate("/login");
        return;
      }
      console.log(error);
    }
  };

  return (
    <div
      key={index}
      className="book-card"
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <div className="book-card-cover">
        {book.thumbnail ? (
          <img
            className="thumbnail-img"
            src={book.thumbnail}
            onError={(e) => (e.target.onerror = null)}
          />
        ) : (
          <div className="no-thumbnail-img">
            <img src={BookSvg} width={25} height={25} />
          </div>
        )}
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
          {book.buylink && (
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                window.open(book.buylink, "_blank");
              }}
            >
              Buy Now
            </button>
          )}
          <button
            className="btn btn-outline"
            onClick={(e) => {
              e.stopPropagation();
              addBookToList();
            }}
          >
            Add To List
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
