const { reviewModel } = require("../models/reviewModel");
const { recipeModel } = require("../models/recipeModel");

const createReview = async (req, res) => {
  const { comment, rating } = req.body;
  const { recipeId } = req.params;

  if (!comment || !rating)
    return res
      .status(400)
      .json({ success: false, message: "Comment and rating are required" });

  try {
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

    res
      .status(201)
      .json({ success: true, message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getReviewsForRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const reviews = await reviewModel
      .find({ recipe: recipeId })
      .populate("author", "name email");
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id);
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    await reviewModel.findByIdAndDelete(req.params.id);
    await recipeModel.findByIdAndUpdate(review.recipe, {
      $pull: { reviews: review._id },
    });

    res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createReview, getReviewsForRecipe, deleteReview };
