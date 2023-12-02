const CampaignModel = require("../../models/campaignsSchema");

exports.executeCampaign = async (req, res, next) => {
  try {
    const campaign = await CampaignModel.findById(req.params.campaignId);
    if (!campaign)
      return res
        .status(400)
        .json({ success: false, message: "No Campaign Found" });

    if (!campaign.teamA.leader && !campaign.teamB.leader)
      return res.status(400).json({
        success: false,
        message: "Need to have a leader for both teams",
      });

    const updatedCampaign = await CampaignModel.findByIdAndUpdate(
      campaign._id,
      { status: "executed" },
      { new: true }
    ).populate(
      "group volunteers.user teamA.members teamB.members teamA.leader teamB.leader"
    );

    return res.status(200).json({ success: true, campaign: updatedCampaign });
  } catch (error) {
    console.log("error in initiate campaign is ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
