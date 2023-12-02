const mongoose = require("mongoose");

const dbSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewUsers",
    },
  ],

  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
  ],

  //for showing the latest message with each chat on chat list screen
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Messages",
  },
});

const Data = new mongoose.model("chats", dbSchema);
module.exports = Data;
