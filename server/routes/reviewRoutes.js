const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Create a review
router.post("/", async (req, res) => {
  const { user, skill, rating, comment } = req.body;
  try {
    const review = new Review({ user, skill, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reviews for a specific skill
router.get("/:skillId", async (req, res) => {
  try {
    const reviews = await Review.find({ skill: req.params.skillId }).populate("user", "name");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
