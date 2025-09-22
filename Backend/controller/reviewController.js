const { reviewModel } = require("../models/reviewModel");
const { recipeModel } = require("../models/recipeModel");

const createReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const { recipeId } = req.params;

    const recipe = await recipeModel.findById(recipeId);
    if (!recipe)
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });

    const review = await reviewModel.create({
      rating,
      comment,
      author: req.userId,
      recipe: recipe._id,
    });

    recipe.reviews.push(review._id);
    await recipe.save();

    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getReviewsForRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const reviews = await reviewModel
      .find({ recipe: recipeId })
      .populate("author", "name email");
    res.status(200).json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await reviewModel.findById(id);
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    await reviewModel.findByIdAndDelete(id);
    await recipeModel.findByIdAndUpdate(review.recipe, {
      $pull: { reviews: review._id },
    });

    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createReview, getReviewsForRecipe, deleteReview };
