const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
      },
    ],
    instructions: { type: String, required: true },
    images: [{ url: String, filename: String }],
    videoUrl: { type: String },
    filters: [String],
    tags: [String],
  },
  { timestamps: true }
);

const recipeModel = mongoose.model("Recipe", recipeSchema);
module.exports = { recipeModel };
