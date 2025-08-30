const mongoose = require("mongoose");

const cookBookSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    recipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const cookBookModel = new mongoose.model("CookBook", cookBookSchema);

module.exports = { cookBookModel };
