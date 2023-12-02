const mongoose = require("mongoose");

const dbSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "NewUsers",
    },

    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups",
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

const GroupMessages = new mongoose.model("GroupMessages", dbSchema);

module.exports = GroupMessages;
