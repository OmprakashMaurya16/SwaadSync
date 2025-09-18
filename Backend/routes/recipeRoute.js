const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudConfig");
const {
  addRecipe,
  listRecipe,
  removeRecipe,
} = require("../controller/recipeController");
const { authMiddleware } = require("../middleware/auth");

const recipeRouter = express.Router();
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

recipeRouter.delete("/:id/remove", authMiddleware, removeRecipe);

module.exports = { recipeRouter };
