import { useState, useEffect } from 'react';

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

  // Fetch reviews when the component mounts / page loads
  useEffect(() => {
    fetchReviews();
  }, []);

  // Save a new review to the database (POST API)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission and page refresh
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
        // Refresh the review list to show the newly added review
        fetchReviews();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // Handle form input state changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Feedback & Review Aggregator</h1>

      {/* Review Submission Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rating: </label>
          <select name="rating" value={formData.rating} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Comment: </label>
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
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        reviews.map((rev) => (
          <div key={rev._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
            <h3>{rev.username} ({rev.rating}/5 ⭐)</h3>
            <p>{rev.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;