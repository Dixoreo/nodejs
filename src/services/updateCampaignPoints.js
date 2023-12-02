const CampaignModel = require("../models/campaignsSchema");
const BucketModel = require("../models/bucketsSchema");

exports.updatePoints = async (data) => {
  try {
    const campaign = await CampaignModel.findById(data.campaignId).populate(
      "group volunteers.user teamA.members teamB.members teamA.leader teamB.leader"
    );
    if (!campaign) return { error: true, message: "No Campaign Found" };

    const { teamName, bucketId, bucketCount } = data;

    const bucket = await BucketModel.findById(bucketId);
    if (!bucket) return { error: true, message: "No Bucket Found" };

    campaign[teamName].points += bucket.points * bucketCount;

    const updateCampaign = await campaign.save();
    
    return { campaign: updateCampaign };
  } catch (error) {
    console.log("error in update campaigns ", error);
    return { error: true, message: error.message };
  }
};
