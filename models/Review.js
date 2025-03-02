const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    name: String,
    product: String,
    rating: String,
    comment: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", ReviewSchema);
