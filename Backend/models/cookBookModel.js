const mongoose = require("mongoose");

const cookBookSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true }
);

const cookBookModel = mongoose.model("CookBook", cookBookSchema);
module.exports = { cookBookModel };
