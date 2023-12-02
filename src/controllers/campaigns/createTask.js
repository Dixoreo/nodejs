const CampaignsModel = require("../../models/campaignsSchema");
const TasksModel = require("../../models/tasksSchema");

const mongoose = require("mongoose");
exports.createTask = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    let campaign = await CampaignsModel.findById(req.params.campaignId);
    if (!campaign)
      return res
        .status(400)
        .json({ success: false, message: "No Campaign Found" });

    let newTask = await TasksModel.create([
      {
        title,
        description,
        campaign: campaign._id,
        created_by: req.user._id,
      },
    ]);

    let tasks = await TasksModel.find({ campaign: campaign._id }).populate(
      "created_by",
      "fullName"
    );

    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.log("error in create task is ", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
