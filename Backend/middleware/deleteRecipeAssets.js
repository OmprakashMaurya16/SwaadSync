const cloudinary = require("cloudinary").v2;
const { recipeModel } = require("../models/recipeModel");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

const deleteRecipeAssets = async (req, res, next) => {
  try {
    const recipe = await recipeModel.findById(req.body._id);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }
    for (const img of recipe.images) {
      await cloudinary.uploader.destroy(img.filename, {
        resource_type: "image",
      });
    }
    if (recipe.videoUrl) {
      await cloudinary.uploader.destroy(recipe.videoUrl, {
        resource_type: "video",
        type: "upload",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { deleteRecipeAssets };
