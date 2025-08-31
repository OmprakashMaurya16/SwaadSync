const express = require("express");
const {
  addToCookBook,
  removeFromCookBook,
  getAllRecipe,
} = require("../controller/cookBookoController");
const { authMiddleware } = require("../middleware/auth");

const cookBookRouter = express.Router();

cookBookRouter.post("/add", authMiddleware, addToCookBook);

cookBookRouter.post("/remove", authMiddleware, removeFromCookBook);

cookBookRouter.get("/get", authMiddleware, getAllRecipe);

module.exports = { cookBookRouter };
