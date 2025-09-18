const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.mimetype.startsWith("image/")) {
      return {
        folder: "recipes/images",
        allowed_formats: ["jpg", "png", "jpeg"],
      };
    } else if (file.mimetype.startsWith("video/")) {
      return {
        folder: "recipes/videos",
        allowed_formats: ["mp4", "mov", "avi"],
        resource_type: "video",
      };
    }
  },
});

module.exports = { storage };
