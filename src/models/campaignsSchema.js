const mongoose = require("mongoose");
const { Schema } = mongoose;
const campaignsSchema = new Schema({
  campaignName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    // required: true,
  },
  endTime: {
    type: Date,
    // required: true,
  },
  radius: {
    type: String,
    required: false,
  },
  volunteersRequired: {
    type: Number,
    required: true,
  },
  searchTag: {
    type: String,
    // required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NewUsers",
    required: true,
  },
  status: {
    type: String,
    enum: ["planning", "created", "executed", "archived"],
    default: "executed",
  },

  teamA: {
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewUsers",
    },
    points: {
      type: Number,
      default: 0,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NewUsers",
      },
    ],
  },
  teamB: {
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewUsers",
    },
    points: {
      type: Number,
      default: 0,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NewUsers",
      },
    ],
  },
  volunteers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NewUsers",
      },
      status: {
        type: String,
        enum: ["invite", "sent", "accepted", "rejected"],
        default: "invite",
      },
      team: {
        type: String,
        default: null,
      },
    },
  ],
  location: {},
  messages: {
    type: Array, // do-day live poll screen messages
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "groups",
    // required: true,
  },
  color: {
    type: String,
  },
  venue: {
    type: String,
  },
  requiredFunds: {
    type: String,
  },
  createFund: {
    type: Number,
    ref: "NewUsers",
  },
});

module.exports = mongoose.model("Campaigns", campaignsSchema);
