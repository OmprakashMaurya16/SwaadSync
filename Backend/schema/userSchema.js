const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    badges: {
      type: [String],
      default: [],
    },
    savedRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    testedRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    ingredients: [
      {
        name: { type: String, required: true, trim: true },
        unit: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = { userSchema };
