const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// POST: Submit a Review
router.post("/submit", async (req, res) => {
    try {
        const { name, product, rating, comment } = req.body;

        if (!name || !product || !rating || !comment) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newReview = new Review({ name, product, rating, comment });
        await newReview.save();

        res.status(201).json({ message: "Review submitted successfully!" });
    } catch (error) {
        console.error("Error submitting review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET: Fetch all reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
