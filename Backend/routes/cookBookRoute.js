const express = require("express");
const {
  addToCookBook,
  removeFromCookBook,
  getAllRecipe,
} = require("../controller/cookBookController");
const { authMiddleware } = require("../middleware/auth");

const cookBookRouter = express.Router();

cookBookRouter.post("/add", authMiddleware, addToCookBook);
cookBookRouter.get("/get", authMiddleware, getAllRecipe);
cookBookRouter.delete("/:id/remove", authMiddleware, removeFromCookBook);

module.exports = { cookBookRouter };
