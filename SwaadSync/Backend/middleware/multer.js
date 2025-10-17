const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

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

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image and video files are allowed"), false);
    }
  }
});

module.exports = { storage, upload }; 