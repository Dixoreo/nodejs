const mongoose = require("mongoose");
const dbSchema = new mongoose.Schema({
  campaignName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: { type: Date, required: true }, //this will hold the start date and time
  radius: { type: String, required: false },
  location: {},
  TeamA: {
    type: (TeamB = {}),
    required: true,
  },
  TeamB: {
    type: (TeamA = {}),
    required: true,
  },
  volunteers: {
    type: Array,
    required: true,
  },
  messages: {
    type: Array,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NewUsers",
    required: true,
  },
  locked: {
    type: Boolean,
    default: true,
  },

  endTime: {
    type: Date,
    required: true,
  },
  color: { type: String, required: true },
  status: {
    type: String,
    enum: ["archived", "active"],
    default: "active",
  },
});

const Data = new mongoose.model("todays", dbSchema);

module.exports = Data;
