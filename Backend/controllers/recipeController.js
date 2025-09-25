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
    console.log('Request files:', req.files); 

    // Handle ingredients parsing
    let ingredients = [];
    try {
      ingredients = req.body.ingredients ? JSON.parse(req.body.ingredients) : [];
    } catch (parseError) {
      console.log('Ingredients parse error:', parseError);
      ingredients = req.body.ingredients || [];
    }

    const filters = req.body.filters ? JSON.parse(req.body.filters) : [];
    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];

    const images = req.files && req.files.image 
      ? req.files.image.map(file => ({
          url: file.path, 
          filename: file.filename, 
          cloudinaryId: file.filename 
        }))
      : [];

    let videoUrl = '';
    let videoFilename = '';
    
    if (req.files && req.files.video && req.files.video[0]) {
      const videoFile = req.files.video[0];
      videoUrl = videoFile.path;
      videoFilename = videoFile.filename;
    } else if (req.body.videoUrl) {
      videoUrl = req.body.videoUrl;
    }

    if (!req.body.name || !req.body.description || !req.body.instructions) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, and instructions are required'
      });
    }

    const newRecipe = await recipeModel.create({
      owner: req.userId,
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      instructions: req.body.instructions.trim(),
      ingredients: ingredients,
      images: images,
      videoUrl: videoUrl,
      filters: filters,
      tags: tags,
    });

    res.status(201).json({
      success: true,
      message: "Recipe added successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    console.error('Recipe creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
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
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe)
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });

    await recipeModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Recipe deleted successfully", recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getRecipeById = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id)
      .populate('owner', 'name email') 
      .populate('reviews'); 

    if (!recipe) {
      return res.status(404).json({ 
        success: false, 
        message: "Recipe not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      recipe 
    });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
module.exports = { addRecipe, listRecipe, removeRecipe, getRecipeById };
