const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import the Review model from the 'model' directory
const Review = require('./model/review');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.log('MongoDB connection error:', err));

// ==========================================
// API ROUTES (Backend & Database Operations)
// ==========================================

// 1. API to create and save new Feedback/Review (POST Request)
app.post('/api/reviews', async (req, res) => {
    try {
        const { username, rating, comment } = req.body;
        const newReview = new Review({ username, rating, comment });
        await newReview.save();
        res.status(201).json({ message: 'Review saved successfully!', newReview });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save review' });
    }
});

// 2. API to get all reviews (GET Request)
app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});