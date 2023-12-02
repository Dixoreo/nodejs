const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("destination called");
    //args sequence is errors, destination
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log("file name called");
    console.log(file);
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits:{ fileSize: 50 * 1024 * 1024},
  fileFilter: function (req, file, cb) {
    console.log("file type is ", file.mimetype);
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "video/mp4"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Image file type invalid"), false);
    }
  },
});

module.exports = upload;
