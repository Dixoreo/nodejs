const multer = require("multer");

const uploadmedia = (media) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/messageMedia");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + media.name);
    },
  });
  const MessageMediaUploader = multer({
    storage: storage,

    fileFilter: function (req, file, cb) {
      if (
        media.type === "audio/mpeg" ||
        media.type === "application/pdf" ||
        media.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        media.type === "image/jpeg" ||
        media.type === "image/png" ||
        media.type === "image/jpg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("document type is invalid"), false);
      }
    },
  });
  return media;
};

module.exports = uploadmedia;
