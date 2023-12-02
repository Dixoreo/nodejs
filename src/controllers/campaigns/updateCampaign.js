const CampaignModel = require("../../models/campaignsSchema");

exports.updateCampaign = async (req, res, next) => {
  console.log("update called");
  try {
    let campaign = await CampaignModel.findById(req.params.campaignId);
    const { volunteers, ...update } = req.body.updateObj;
    const existingVolunteers = campaign.volunteers;
    const updatedVolunteers = [...existingVolunteers, ...volunteers];

    console.log("updated volunteeres are ", updatedVolunteers);
    if (!campaign)
      return res
        .status(400)
        .json({ success: false, message: "Campaign not found" });

    await CampaignModel.findByIdAndUpdate(campaign._id, {
      volunteers: updatedVolunteers,
      ...update,
    });

    return res.status(200).json({ success: true, campaign });
  } catch (error) {
    console.log("error is ", error.message);
    return res.status(300).json({ success: false, message: error.message });
  }
};
