require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const { recipeRouter } = require("./routes/recipeRoute");
const { userRouter } = require("./routes/userRoute");
const { cookBookRouter } = require("./routes/cookBookRoute");
const { reviewRouter } = require("./routes/reviewRoute");

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

app.use("/api/recipes", recipeRouter);
app.use("/api/users", userRouter);
app.use("/api/cookbook", cookBookRouter);
app.use("/api/reviews", reviewRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
