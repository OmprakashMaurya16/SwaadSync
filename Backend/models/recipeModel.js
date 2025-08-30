const mongoose = require("mongoose");
const { recipeSchema } = require("../schema/recipeSchema");

const recipeModel = new mongoose.model("Recipe", recipeSchema);

module.exports = { recipeModel };
