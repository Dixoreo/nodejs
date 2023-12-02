const CampaignModel = require("../../models/campaignsSchema");
const NotificationModel = require("../../models/notification")

//this api will receive the status (accepted,rejected)
//this will set the status of that user in the volunteers field.
exports.invitesResponse = async (req, res, next) => {
  console.log("invite response hit")
  try {
    let campaign = await CampaignModel.findById(req.params.campaignId);
    if (!campaign)
      return res
        .status(400)
        .json({ success: false, message: "campaign not found" });

    const { status,notificationId,title } = req.body;
    let user = req.user._id;

    console.log("user is ", user);

    //getting volunteers out of the campaign
    let { volunteers } = campaign;
    console.log("INITIAL VOLUNTEERS WILL BE =>", volunteers);

    let updatedVolunteers = volunteers.map((volunteer) => {
      if (volunteer.user.toString() === user) {
        console.log("MATCHED VOLUNTEER IS ", volunteer);
        return {
          user: volunteer.user,
          status,
        };
      }
      return volunteer;
    });

    console.log("UPDATED VOLUNTEERS WILL BE => ", updatedVolunteers);
    let updatedCampaign = await CampaignModel.findByIdAndUpdate(
      req.params.campaignId,
      { volunteers: updatedVolunteers },
      { new: true, runValidators: true }
    );

    await NotificationModel.updateOne(
      { _id: notificationId },
      {
        $set: {
          "data.title": title,
        },
      }
    );
    return res.status(200).json({ success: true ,updatedCampaign});

    
  } catch (error) {
    console.log("errror in accept invites ", error);
    return res.status(500).json({ success: true, message: error.message });
  }
};
