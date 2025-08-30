require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { userModel } = require("./models/userModel");
const { recipeModel } = require("./models/recipeModel");

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => console.log("Mongodb connected successfully"))
  .catch((err) => console.log(`Mongodb connection error : ${err}`));

app.listen(PORT, () => {
  console.log(`Server is started at http://localhost:${PORT}`);
});
