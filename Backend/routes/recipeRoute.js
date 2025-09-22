const express = require("express");
const {
  addRecipe,
  listRecipe,
  removeRecipe,
} = require("../controllers/recipeController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { storage } = require("../middleware/multer");
const multer = require("multer");

const upload = multer({ storage });
const router = express.Router();

router.get("/", listRecipe);
router.post(
  "/",
  authMiddleware,
  upload.fields([{ name: "image" }, { name: "video" }]),
  addRecipe
);
router.delete("/:id", authMiddleware, removeRecipe);

module.exports = { recipeRouter: router };
