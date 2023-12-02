const mongoose = require("mongoose");

const dbSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewUsers",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
    },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "NewUsers" }],
    type: {
      type: String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      ref: "Order",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Messages = new mongoose.model("Messages", dbSchema);

module.exports = Messages;
