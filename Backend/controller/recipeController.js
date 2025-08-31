const { recipeModel } = require("../models/recipeModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "YOUR_CLOUD_NAME",
  api_key: "YOUR_API_KEY",
  api_secret: "YOUR_API_SECRET",
});

const addRecipe = async (req, res) => {
  try {
    const ingredients = req.body.ingredients
      ? JSON.parse(req.body.ingredients)
      : [];
    const filters = req.body.filters ? JSON.parse(req.body.filters) : [];
    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];
    const images = req.files.image
      ? req.files.image.map((file) => ({
          url: file.path,
          filename: file.filename,
        }))
      : [];
    const videoUrl = req.files.video ? req.files.video[0].filename : "";

    const newRecipe = new recipeModel({
      owner: req.body.owner,
      name: req.body.name,
      description: req.body.description,
      instructions: req.body.instructions,
      ingredients,
      images,
      videoUrl,
      filters,
      tags,
    });

    await newRecipe.save();
    res.status(201).json({ success: true, recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const listRecipe = async (req, res) => {
  try {
    const recipe = await recipeModel.find({});
    res.status(200).json({ success: true, recipe: recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeRecipe = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.body._id);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }
    await recipeModel.findByIdAndDelete(req.body._id);
    res
      .status(200)
      .json({ success: true, message: "Recipe Removed", recipe: recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addRecipe, listRecipe, removeRecipe };
