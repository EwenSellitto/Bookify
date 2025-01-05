import "./BookCard.css";

function BookCard({ book }) {
  const placeholderImage = "https://via.placeholder.com/150";

  return (
    <div className="book-card">
      <div className="book-cover">
        <img
          src={book.coverImage}
          alt={book.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImage;
          }}
        />
      </div>

      <div className="book-details">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>

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
