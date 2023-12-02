const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountUpgradeSchema = new Schema({
  //user who made the upgradation request
  user: {
    type: Schema.Types.ObjectId,
    ref: "NewUsers",
    required: true,
  },
  requestedRole: {
    type: String,
    required: true,
    enum: ["celebrity", "volunteer"],
  },
  instagramProfile: {
    type: String,
    required: false,
  },
  facebookProfile: {
    type: String,
    required: false,
  },
  twitterProfile: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["approved", "declined", "pending"],
    default: "pending",
  },
  declinedReason:{
    type:String,
  }
});

module.exports = mongoose.model("UpgradeRequests", accountUpgradeSchema);
