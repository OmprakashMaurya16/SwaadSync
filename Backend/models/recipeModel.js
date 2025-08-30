const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
        unit: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    instructions: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    videoUrl: {
      type: String,
      required: true,
    },
    filters: [String],
    tags: [String],
  },
  { timestamps: true }
);

const recipeModel = new mongoose.model("Recipe", recipeSchema);

module.exports = { recipeModel };
