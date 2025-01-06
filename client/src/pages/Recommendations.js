import BookCard from "../components/BookCard";
import "./Recommendations.css";

function Recommendations({ books }) {
  return (
    <section className="recommendations">
      <div className="recommendations-header">
        <h2>Books suggestions for you</h2>
        <p>Based on your reading history</p>
      </div>
      <div className="book-grid">
        {books.map((book, index) => (
          <BookCard book={book} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Recommendations;
