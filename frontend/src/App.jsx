import { useState, useEffect } from 'react';

function App() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ username: '', rating: 5, comment: '' });

  // Backend se saare reviews mangwana (GET API)
  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Jab page load ho, toh reviews fetch karein
  useEffect(() => {
    fetchReviews();
  }, []);

  // Naya review database mein save karna (POST API)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page ko refresh hone se rokn
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ username: '', rating: 5, comment: '' }); // Form clear kar do
        fetchReviews(); // List ko update kar do taaki naya review turant dikhe
      }
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>📝 Feedback & Review Aggregator</h1>

      {/* Review likhne ka Form */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h2 style={{ marginTop: '0' }}>Add Your Review</h2>
        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              style={{ width: '95%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Rating (1 to 5): </label>
            <input
              type="number"
              min="1" max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              required
              style={{ padding: '8px', width: '60px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <textarea
              placeholder="Write your feedback here..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              required
              style={{ width: '95%', padding: '10px', height: '80px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>
            Submit Review
          </button>

        </form>
      </div>

      {/* Save kiye hue Reviews ki List */}
      <h2>Recent Feedbacks</h2>
      {reviews.length === 0 ? (
        <p style={{ color: '#777' }}>No reviews yet. Be the first one to review!</p>
      ) : (
        <div>
          {reviews.map((rev) => (
            <div key={rev._id} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #eaeaea', marginBottom: '15px' }}>
              <h3 style={{ margin: '0 0 10px 0', display: 'flex', justifyContent: 'space-between' }}>
                {rev.username}
                <span style={{ color: '#FFD700' }}>{'⭐'.repeat(rev.rating)}</span>
              </h3>
              <p style={{ margin: '0 0 10px 0', color: '#555' }}>{rev.comment}</p>
              <small style={{ color: '#999' }}>{new Date(rev.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;