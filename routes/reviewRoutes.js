const express = require("express");
const fetch = require("node-fetch");
const Review = require("../models/Review");

const router = express.Router();

router.post("/submit", async (req, res) => {
    const { name, product, rating, comment } = req.body;

    if (!name || !product || !rating) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Save to MongoDB
        const newReview = new Review({ name, product, rating, comment });
        await newReview.save();

        // Send to Discord Webhook
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `📢 **New Review!**\n👤 **${name}**\n🛍 **Product:** ${product}\n⭐ **Rating:** ${rating}\n💬 **Comment:** ${comment || "No comment"}`
            })
        });

        res.json({ message: "✅ Review submitted successfully!" });

    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Failed to submit review" });
    }
});

module.exports = router;
