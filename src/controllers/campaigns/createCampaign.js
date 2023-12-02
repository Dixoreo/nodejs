const GroupsModel = require("../../models/groups");
const CampaignsModel = require("../../models/campaignsSchema");
const TasksModel = require("../../models/tasksSchema");
//for session
const mongoose = require("mongoose");
exports.createCampaign = async (req, res, next) => {
  const {
    campaignName,
    description,
    startTime,
    endTime,
    radius,
    volunteersRequired,
    searchTag,
    volunteers,
    color,
    location,
    venue,
    requiredFunds,
  } = req.body;

  const session = await mongoose.startSession();

  try {
    await session.startTransaction();
    //creating group for the campagin
    const campaignGroup = await GroupsModel.create(
      [
        {
          title: campaignName,
          type: "campaign",
          groupPic: "no-profile-picture-placeholder.png",
          members: [{ member: req.user._id, privilege: "Owner" }],
          messages: [],
        },
      ],
      { session }
    );
    const campaign = await CampaignsModel.create(
      [
        {
          campaignName,
          description,
          startTime,
          endTime,
          radius,
          volunteersRequired,
          searchTag,
          group: campaignGroup[0]._id,
          createdBy: req.user._id,
          volunteers,
          color,
          location,
          venue,
          requiredFunds,
          createFund: 0,
        },
      ],
      { session }
    );
    let tasksTocreate = [
      {
        title: "Get NOC from Government",
        description: "Get NOC from Government",
        created_by: req.user._id,
        campaign: campaign[0]._id,
      },
      {
        title: "Complete Estimated User",
        description: `Complete the number of volunteers required. - ${volunteersRequired} volunteers `,
        created_by: req.user._id,
        campaign: campaign[0]._id,
      },
      {
        title: "Get Volunteers Trained",
        description: "Train the volunteers",
        created_by: req.user._id,
        campaign: campaign[0]._id,
      },
    ];

    //tasks for campaign
    const tasks = await TasksModel.create(tasksTocreate, { session });

    let updatedCampaign = await CampaignsModel.findById(campaign[0]._id)
      .populate({
        path: "volunteers.user",
        model: "NewUsers",
      })
      .session(session);

    console.log("updated campaign is => ", updatedCampaign);

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Campaign Created Successfully",
      campaign: updatedCampaign,
    });
  } catch (error) {
    console.log("error in create campaign is ", error);
    await session.abortTransaction();
    session.endSession();

    return res.status(400).json({ success: false, message: error.message });
  }
};
