const mongoose = require("mongoose");
const { Schema } = mongoose;

const tasksSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  completed_on: {
    type: Date,
  },
  created_by: {
    type: mongoose.Types.ObjectId,
    ref: "NewUsers",
  },
  campaign: {
    type: Schema.Types.ObjectId,
    ref: "Campaigns",
  },
});

module.exports = mongoose.model("Tasks", tasksSchema);
