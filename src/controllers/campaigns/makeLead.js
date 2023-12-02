const CampaignModel = require("../../models/campaignsSchema");

exports.makeLead = async (req, res, next) => {
  try {
    const campaign = await CampaignModel.findById(req.params.campaignId);
    if (!campaign)
      return res
        .status(400)
        .json({ success: false, message: "campaign not found" });

    const { volunteer, teamName } = req.body;
    let query = {};
    let team = campaign[teamName];

    team.leader = volunteer;

    query[teamName] = team;

    //updating team from volunteers list
    let volunteers = campaign.volunteers;
    let updatedVolunteers = volunteers.map((v) => {
      if (v.user.toString() === volunteer) {
        return {
          user: v.user,
          status: v.status,
          team: teamName,
        };
      }
      return v;
    });

    query.volunteers = updatedVolunteers;

    console.log("query is ", query);

    //team.leader = volunteer;

    let updatedCampaign = await CampaignModel.findByIdAndUpdate(
      req.params.campaignId,
      {
        [teamName]: team,
      },
      { new: true, runValidators: true }
    ).populate(
      "group volunteers.user teamA.members teamB.members teamA.leader teamB.leader"
    );
    return res.status(200).json({ success: true, updatedCampaign });
  } catch (error) {
    console.log("errror in make lead ==========> ", error);
    return res.status(500).json({ success: true, message: error.message });
  }
};

exports.makeAutoLead = async (req, res, next) => {
  try {
    const campaign = await CampaignModel.findById(
      req.params.campaignId
    ).populate("teamA.members teamB.members");
    if (!campaign)
      return res
        .status(400)
        .json({ success: false, message: "campaign not found" });

    const { teamName } = req.body;
    let query = {};
    let team = campaign[teamName];

    let highestPoints = 0;
    let higestPointUser;

    team?.members?.forEach((user) => {
      if (user?.points >= highestPoints) {
        highestPoints = user.points;
        higestPointUser = user._id;
      }
    });

    let unpopulatedCampaign = await CampaignModel.findById(
      req.params.campaignId
    );
    let unpopulatedTeam = unpopulatedCampaign[teamName];
    unpopulatedTeam.leader = higestPointUser;

    query[teamName] = unpopulatedTeam;

    let updatedCampaign = await CampaignModel.findByIdAndUpdate(
      req.params.campaignId,
      query,
      { new: true }
    ).populate(
      "group volunteers.user teamA.members teamB.members teamA.leader teamB.leader"
    );

    return res.json({ success: true, campaign: updatedCampaign });
  } catch (error) {
    console.log("errror in make lead ==========> ", error);
    return res.status(500).json({ success: true, message: error.message });
  }
};
