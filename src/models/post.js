const mongoose = require("mongoose");
const { Schema } = mongoose;
const dbSchema = new mongoose.Schema({
  postedby: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "NewUsers",
  },
  description: {
    type: String,
    required: false,
  },
  media: {
    type: {},
    required: false,
  },
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "NewUsers",
      required: true,
    },
  ],
  comments: [
    {
      commented_by: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "NewUsers",
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  shares: [
    {
      type: Schema.Types.ObjectId,
      ref: "NewUsers",
    },
  ],
  createdAT: {
    type: Date,
    default: Date.now,
  },
});

const Data = new mongoose.model("post", dbSchema);

module.exports = Data;
