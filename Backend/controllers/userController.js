const { userModel } = require("../models/userModel");
const { cookBookModel } = require("../models/cookBookModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });

    const cleanedEmail = email.trim().toLowerCase();
    if (!validator.isEmail(cleanedEmail))
      return res.status(400).json({ success: false, message: "Invalid email" });

    if (password.length < 8)
      return res
        .status(400)
        .json({ success: false, message: "Password too short" });

    const exists = await userModel.findOne({ email: cleanedEmail });
    if (exists)
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const user = await userModel.create({
      name: name.trim(),
      email: cleanedEmail,
      password: hashedPassword,
    });

    await cookBookModel.create({
      owner: user._id,
      title: "My Cookbook",
      recipes: [],
    });

    const token = createToken(user._id);
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });

    const cleanedEmail = email.trim().toLowerCase();
    const user = await userModel.findOne({ email: cleanedEmail });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });

    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = createToken(user._id);
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { loginUser, registerUser };
