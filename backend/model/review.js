const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1, // Minimum rating is 1 star
        max: 5  // Maximum rating is 5 stars
    },
    comment: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'General'
    }
}, { timestamps: true }); // timestamps automatically saves creation and update date/time

module.exports = mongoose.model('Review', reviewSchema);