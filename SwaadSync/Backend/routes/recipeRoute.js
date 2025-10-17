const express = require("express");
const {
  addRecipe,
  listRecipe,
  removeRecipe,
  getRecipeById,
} = require("../controllers/recipeController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/multer"); 

const router = express.Router();

router.get("/", listRecipe);
router.get("/:id", getRecipeById); 

router.post(
  "/",
  authMiddleware,
  upload.fields([{ name: "image", maxCount: 3 }, { name: "video", maxCount: 1 }]),
  addRecipe
);
router.delete("/:id", authMiddleware, removeRecipe);

module.exports = { recipeRouter: router };