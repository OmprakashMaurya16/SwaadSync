const { cookBookModel } = require("../models/cookBookModel");

const addToCookBook = async (req, res) => {
  const { recipeId, title } = req.body;
  const userId = req.userId;

  try {
    let cookBook = await cookBookModel.findOne({ owner: userId });

    if (!cookBook) {
      cookBook = new cookBookModel({
        owner: userId,
        title: title || "My Cookbook",
        recipes: [],
      });
    }

    if (cookBook.recipes.includes(recipeId)) {
      return res
        .status(400)
        .json({ success: false, message: "Recipe already in cookbook" });
    }

    cookBook.recipes.push(recipeId);
    await cookBook.save();

    res
      .status(200)
      .json({ success: true, message: "Recipe added to cookbook", cookBook });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromCookBook = async (req, res) => {
  const userId = req.userId;
  const recipeId = req.params.id;

  try {
    const cookBook = await cookBookModel.findOne({ owner: userId });
    if (!cookBook)
      return res
        .status(404)
        .json({ success: false, message: "Cookbook not found" });

    cookBook.recipes = cookBook.recipes.filter(
      (id) => id.toString() !== recipeId
    );
    await cookBook.save();

    res.status(200).json({
      success: true,
      message: "Recipe removed from cookbook",
      cookBook,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllRecipe = async (req, res) => {
  const userId = req.userId;
  try {
    const cookBook = await cookBookModel
      .findOne({ owner: userId })
      .populate("recipes");
    if (!cookBook)
      return res
        .status(404)
        .json({ success: false, message: "Cookbook not found" });

    res.status(200).json({ success: true, recipes: cookBook.recipes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addToCookBook, removeFromCookBook, getAllRecipe };
