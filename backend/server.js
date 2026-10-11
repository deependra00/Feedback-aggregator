require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Apna Review model import kar rahe hain (folder ka naam 'model' hai)
const Review = require('./model/Review');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB se connection successful ho gaya!'))
    .catch((err) => console.log('❌ MongoDB connection error:', err));


// ==========================================
// API ROUTES (Backend aur Database ka connection)
// ==========================================

// 1. Naya Feedback/Review Save karne ka API (POST Request)
app.post('/api/reviews', async (req, res) => {
    try {
        const { username, rating, comment, category } = req.body;

        const newReview = new Review({ username, rating, comment, category });
        const savedReview = await newReview.save(); // Database mein save ho raha hai

        res.status(201).json({ message: "Review successfully saved!", data: savedReview });
    } catch (error) {
        res.status(500).json({ message: "Error saving review", error: error.message });
    }
});

// 2. Saare Feedbacks dekhne ka API (GET Request)
app.get('/api/reviews', async (req, res) => {
    try {
        // .sort({ createdAt: -1 }) se naye reviews sabse upar aayenge
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error: error.message });
    }
});


// Server Start Karna
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server http://localhost:${PORT} par start ho gaya hai`);
});