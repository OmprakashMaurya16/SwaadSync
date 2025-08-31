const multer = require("multer");
const { storage } = require("../config/cloudConfig");
const { addRecipe } = require("../controller/recipeController");
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

module.exports = recipeRouter;
