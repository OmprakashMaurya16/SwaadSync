const mongoose = require("mongoose");

const connectDB = async () => {
  const MONGO_URL = process.env.MONGO_URL;
  if (!MONGO_URL) throw new Error("MONGO_URL is not defined in .env");

  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
