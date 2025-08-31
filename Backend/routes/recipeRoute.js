const multer = require("multer");
const { storage } = require("../config/cloudConfig");
const {
  addRecipe,
  listRecipe,
  removeRecipe,
} = require("../controller/recipeController");
const { deleteRecipeAssets } = require("../middleware/deleteRecipeAssets");
const { authMiddleware } = require("../middleware/auth");
const recipeRouter = require("express").Router();

const upload = multer({ storage });

recipeRouter.post(
  "/add",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 3 },
    { name: "video", maxCount: 1 },
  ]),
  addRecipe
);

recipeRouter.get("/list", authMiddleware, listRecipe);

recipeRouter.post("/remove", authMiddleware, deleteRecipeAssets, removeRecipe);

module.exports = { recipeRouter };
