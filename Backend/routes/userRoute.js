const express = require("express");
const { loginUser, registerUser } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = { userRouter: router };
