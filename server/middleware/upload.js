const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "bookcycle",
        allowed_formats: ["jpg", "jpeg", "png"]
    }
});

const upload = multer({ storage });

module.exports = upload;
