const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1, // Kam se kam 1 star
        max: 5  // Zyada se zyada 5 star
    },
    comment: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'General'
    }
}, { timestamps: true }); // timestamps se create hone ka date/time khud save ho jayega

module.exports = mongoose.model('Review', reviewSchema);