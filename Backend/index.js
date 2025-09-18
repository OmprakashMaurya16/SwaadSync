require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { recipeRouter } = require("./routes/recipeRoute");
const { userRouter } = require("./routes/userRoute");
const { cookBookRouter } = require("./routes/cookBookRoute");

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) throw new Error("MONGO_URL is not defined in .env");

app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

app.use("/api/recipes", recipeRouter);
app.use("/api/users", userRouter);
app.use("/api/cookbook", cookBookRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error" });
});

app.use("/", (req, res) => {
  res.status(200).json({ success: true, message: "Surver is running" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
