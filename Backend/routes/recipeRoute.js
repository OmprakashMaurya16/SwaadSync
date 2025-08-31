const multer = require("multer");
const { storage } = require("../config/cloudConfig");
const {
  addRecipe,
  listRecipe,
  removeRecipe,
} = require("../controller/recipeController");
const { deleteRecipeAssets } = require("../middleware/deleteRecipeAssets");
const recipeRouter = require("express").Router();

const upload = multer({ storage });

recipeRouter.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 3 },
    { name: "video", maxCount: 1 },
  ]),
  addRecipe
);

recipeRouter.get("/list", listRecipe);

recipeRouter.post("/remove", deleteRecipeAssets, removeRecipe);

module.exports = { recipeRouter };
