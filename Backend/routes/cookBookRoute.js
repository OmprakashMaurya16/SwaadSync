const express = require("express");
const {
  addToCookBook,
  removeFromCookBook,
  getAllRecipe,
} = require("../controllers/cookBookController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAllRecipe);
router.post("/", authMiddleware, addToCookBook);
router.delete("/:id", authMiddleware, removeFromCookBook);

module.exports = { cookBookRouter: router };
