const mongoose = require("mongoose");
const { Schema } = mongoose;

const BucketSchema = new Schema(
  {
    bucketName: {
      type: String,
      required: true,
    },
    plantName: {
      type: String,
      required: true,
    },
    numOfPlants: {
      type: Number,
      required: true,
      min: 1,
    },
    points: {
      type: Number,
      required: true,
      min: 10,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Buckets", BucketSchema);
