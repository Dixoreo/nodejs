const CampaignModel = require("../../models/campaignsSchema");

exports.getByQuery = async (req, res, next) => {
  try {
    console.log("req query ", req.query);
    const campaign = await CampaignModel.findOne(req.query).populate(
      "group volunteers.user teamA.members teamB.members teamA.leader teamB.leader"
    );
    console.log(campaign);
    return res.status(200).json({ success: true, campaign });
  } catch (error) {
    console.log("error in get all campaings is ", error);
    return res.status(200).json({ success: false, message: error.message });
  }
};

exports.getMultipleByQuery = async (req, res, next) => {
  try {
    console.log("req query ", req.query);
    const campaigns = await CampaignModel.find(req.query).populate(
      "group volunteers.user teamA.members teamB.members teamA.leader teamB.leader"
    );
    return res.status(200).json({ success: true, campaigns });
  } catch (error) {
    console.log("error in get all campaings is ", error);
    return res.status(200).json({ success: false, message: error.message });
  }
};
