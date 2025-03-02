require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON data
app.use(cors()); // Allow frontend to communicate with backend

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Review Schema
const ReviewSchema = new mongoose.Schema({
    name: String,
    review: String,
    date: { type: Date, default: Date.now }
});
const Review = mongoose.model("Review", ReviewSchema);

// Routes
app.post("/reviews", async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).json({ message: "Review saved successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Error saving review" });
    }
});

app.get("/reviews", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: "Error fetching reviews" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
