const { recipeModel } = require("../models/recipeModel");

const parseJSONorString = (field) => {
  if (!field) return [];
  try {
    if (typeof field === "string") return JSON.parse(field);
    return field;
  } catch {
    return field.split(",").map((i) => i.trim());
  }
};

const addRecipe = async (req, res) => {
  try {
    const ingredients = parseJSONorString(req.body.ingredients);
    const filters = parseJSONorString(req.body.filters);
    const tags = parseJSONorString(req.body.tags);

    const images =
      req.files?.image?.map((file) => ({
        url: file.path,
        filename: file.filename,
      })) || [];

    const videoUrl = req.files?.video?.[0]?.path || req.body.videoUrl || "";

    const newRecipe = await recipeModel.create({
      owner: req.userId,
      name: req.body.name,
      description: req.body.description,
      instructions: req.body.instructions,
      ingredients,
      images,
      videoUrl,
      filters,
      tags,
    });

    res.status(201).json({ success: true, recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const listRecipe = async (req, res) => {
  try {
    const recipes = await recipeModel.find({});
    res.status(200).json({ success: true, recipes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await recipeModel.findById(recipeId);
    if (!recipe)
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });

    await recipeModel.findByIdAndDelete(recipeId);
    res.status(200).json({ success: true, message: "Recipe removed", recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addRecipe, listRecipe, removeRecipe };
