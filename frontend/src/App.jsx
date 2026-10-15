import { useState, useEffect } from 'react';
import './App.css'; // Importing your existing stylesheet

function App() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ username: '', rating: 5, comment: '' });

  // Fetch all reviews from the backend API (GET API)
  const fetchReviews = async () => {
    try {
      const response = await fetch('https://feedback-aggregator-teg3.onrender.com/api/reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Fetch reviews when the component mounts
  useEffect(() => {
    fetchReviews();
  }, []);

  // Save a new review to the database (POST API)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    try {
      const response = await fetch('https://feedback-aggregator-teg3.onrender.com/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form inputs after successful submission
        setFormData({ username: '', rating: 5, comment: '' });
        // Refresh review list to display the newly added review
        fetchReviews();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // Handle form input state updates
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Feedback & Review Aggregator</h1>

      {/* Review Submission Form */}
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Rating:</label>
          <select name="rating" value={formData.rating} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Comment:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit Review</button>
      </form>

      {/* Display List of Reviews */}
      <h2>All Reviews</h2>
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev._id} className="review-card">
              <h3>{rev.username} ({rev.rating}/5 ⭐)</h3>
              <p>{rev.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;