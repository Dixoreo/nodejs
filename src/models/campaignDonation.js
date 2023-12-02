const mongoose = require("mongoose");
const { Schema } = mongoose;
const campaignsDonation = new Schema({
  accountTitle: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    require: true,
  },
  amount: {
    type: String,
    require: true,
  },
  bankAcoount: {
    type: String,
    require: true,
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaigns",
    required: true,
  },
  donatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NewUsers",
    required: true,
  },
});

module.exports = mongoose.model("CampaignsDonation", campaignsDonation);
