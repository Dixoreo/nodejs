const CampaignsModel = require("../../models/campaignsSchema");
const { sendVevoMessage } = require("../../services/sendVevoMessage");
const NotificationsModel = require("../../models/notification");
exports.inviteVolunteer = async (req, res, next) => {
  try {
    let campaign = await CampaignsModel.findById(req.params.campaignId);
    const { phoneNumbers, usersToUpdate } = req.body;
    console.log("phone numbers = ", phoneNumbers);
    console.log("users to update = ", usersToUpdate);

    //sending phone message
    for (const num of phoneNumbers) {
      await sendVevoMessage(
        num,
        "You have been invited to an event happening near you!!!"
      );
    }
    if (!campaign)
      return res
        .status(400)
        .json({ success: false, message: "campaign not founds" });

    let { volunteers } = campaign;

    let updatedVolunteers = volunteers.map((v) => {
      if (usersToUpdate.includes(v?.user?.toString())) {
        return {
          user: v.user,
          status: "sent",
        };
      }
      return v;
    });

    let updatedCampaign = await CampaignsModel.findByIdAndUpdate(
      campaign._id,
      {
        volunteers: updatedVolunteers,
      },
      { new: true, runValidators: true }
    ).populate({
      path: "volunteers",
      populate: {
        path: "user",
        select: "profile fullName phoneNumber type",
      },
    });

    //notifications
    let notifications = usersToUpdate.map((user) => {
      return {
        user,
        body: {
          title: "you've been invited to a campaign!",
        },
        data: {
          title: "campaign-invite",
          content: req.params.campaignId,
        },
      };
    });

    await NotificationsModel.create(notifications);

    return res
      .status(200)
      .json({ success: true, updatedCampaign: updatedCampaign.volunteers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
