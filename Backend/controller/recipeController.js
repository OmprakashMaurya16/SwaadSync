const { recipeModel } = require("../models/recipeModel");

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

    const videoUrl = req.files.video ? req.files.video[0].path : "";

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

module.exports = { addRecipe };
