const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const reviewModel = new mongoose.model("Review", reviewSchema);

module.exports = { reviewModel };
