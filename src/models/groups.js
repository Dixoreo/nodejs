const mongoose = require("mongoose");

const dbSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  members: [
    {
      member: { type: mongoose.Schema.Types.ObjectId, ref: "NewUsers" },
      privilege: { type: String },
    },
  ],
  type: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupMessages",
    },
  ],
  groupPic: {
    type: String,
    required: true,
  },
  //for showing the latest message with each chat on chat list screen
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GroupMessages",
  },
});

const Data = new mongoose.model("groups", dbSchema);

module.exports = Data;
