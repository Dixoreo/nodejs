const CampaignModel = require("../../models/campaignsSchema");

exports.addVolunteerToTeam = async (req, res, next) => {
  try {
    let campaign = await CampaignModel.findById(req.params.campaignId);
    if (!campaign)
      return res
        .status(400)
        .json({ success: false, message: "no campaign found" });

    const { teamName, volunteer, presentTeam } = req.body;

    let team = campaign[teamName];
    let members = team.members;
    let query = {};

    if (presentTeam) {
      let existingTeam = campaign[presentTeam];
      let existingMembers = existingTeam.members;

      let filteredExistingMembers = existingMembers.filter((m) => {
        if (m.toString() === volunteer) {
          return false;
        }
        return true;
      });
      existingTeam.members = filteredExistingMembers;
      query[presentTeam] = existingTeam;
    }
    members.push(volunteer);

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
    query[teamName] = team;

    const updatedCampaign = await CampaignModel.findByIdAndUpdate(
      req.params.campaignId,
      query,
      { new: true, runValidators: true }
    ).populate("group volunteers.user teamA.members teamB.members teamA.leader teamB.leader");

    return res.status(200).json({ success: true, updatedCampaign });
  } catch (error) {
    console.log("errror in add volunteer to team ==========> ", error);
    return res.status(500).json({ success: true, message: error.message });
  }
};

exports.removeVolunteerFromTeam = async (req, res, next) => {
  try {
    let campaign = await CampaignModel.findById(req.params.campaignId);
    if (!campaign)
      return res
        .status(400)
        .json({ success: false, message: "no campaign found" });

    const { teamName, volunteer } = req.body;

    let team = campaign[teamName];
    let members = team.members;
    if (team?.leader?.toString() === volunteer) {
      team.leader = null;
    }
    let updatedMembers = members.filter((m) => m.toString() !== volunteer);

    team.members = updatedMembers;

    let { volunteers } = campaign;
    let updatedVolunteers = volunteers.map((v) => {
      if (v.user.toString() === volunteer) {
        return {
          user: v.user,
          status: v.status,
          team: null,
        };
      }
      return v;
    });

    let query = {
      volunteers: updatedVolunteers,
      [teamName]: team,
    };

    let updatedCampaign = await CampaignModel.findByIdAndUpdate(
      req.params.campaignId,
      query,
      { new: true, runValidators: true }
    ).populate("group volunteers.user teamA.members teamB.members teamA.leader teamB.leader");

    return res.status(200).json({ success: true, updatedCampaign });
  } catch (error) {
    console.log("errror in remove volunteer to team ==========> ", error);
    return res.status(500).json({ success: true, message: error.message });
  }
};
