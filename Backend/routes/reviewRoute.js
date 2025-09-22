const express = require("express");
const {
  createReview,
  getReviewsForRecipe,
  deleteReview,
} = require("../controllers/reviewController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:recipeId", authMiddleware, createReview);
router.get("/:recipeId", getReviewsForRecipe);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = { reviewRouter: router };
