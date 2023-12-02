const sharp = require('sharp');
const fs = require('fs');
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const Posts = require("../../models/post");
const UserModel = require("../../models/Register");
const path = require("path");

const videoOptions = {
  codec: "libx264",
  bitrate: "300k",
  size: "720x1280",
};

const addpost = async (req, res) => {
  console.log(req.body);
  try {
    let media = {};

    if (req.file) {
      if (req.file.mimetype === "video/mp4") {
        // Video compression logic (unchanged)
        const inputFilePath = req.file.path;
        const outputFileName =
          req.file.filename.replace(/\.[^/.]+$/, "") + "_compressed.mp4";
        const outputFilePath = path.join(
          __dirname,
          "../../../uploads",
          outputFileName
        );

        await new Promise((resolve, reject) => {
          ffmpeg(inputFilePath)
            .videoCodec(videoOptions.codec)
            .videoBitrate(videoOptions.bitrate)
            .size(videoOptions.size)
            .audioCodec("aac")
            .on("end", () => {
              media = {
                name: req.file.filename,
                type: req.file.mimetype,
                compressedPath: "/videos/compressed/" + req.file.filename, // Use a relative path or URL
              };

              // Replace the original file with the compressed video
              fs.rename(outputFilePath, inputFilePath, (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            })
            .on("error", (err) => {
              reject(err);
            })
            .save(outputFilePath);
        });
      } else if (req.file.mimetype.startsWith("image/")) {
        // Image compression logic
        const inputImagePath = req.file.path;
        const outputImageName =
          req.file.filename.replace(/\.[^/.]+$/, "") + "_compressed.jpg";

        await new Promise((resolve, reject) => {
          sharp(inputImagePath)
          .resize(800, null, { fit: 'inside' })
            .toFile(
              path.join(__dirname, "../../../uploads", outputImageName), // Save in the same location
              (err, info) => {
                if (err) {
                  reject(err);
                } else {
                  media = {
                    name: outputImageName, // Change the name here
                    type: req.file.mimetype,
                    compressedPath: "/images/compressed/" + outputImageName, // Use a relative path or URL
                  };

                  // Delete the original image file
                  fs.unlink(inputImagePath, (err) => {
                    if (err) {
                      console.error("Error deleting original image:", err);
                    }
                  });

                  resolve();
                }
              }
            );
        });
      }
    }

    let parsed = JSON.parse(req.body.postedby);
    const { description } = req.body;

    const savedpost = await Posts.create({
      postedby: parsed,
      description,
      reactions: [],
      comments: [],
      shares: [],
      media: media,
    });

    await UserModel.findByIdAndUpdate(req.user._id, {
      $inc: { points: 5 },
    });

    res.send(savedpost);
  } catch (err) {
    console.error("Error:", err);
    res.status(400).send(err);
  }
};

module.exports = addpost;
