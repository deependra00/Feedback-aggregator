require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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