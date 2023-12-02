const TasksModel = require("../../models/tasksSchema");
const CampaignModel = require("../../models/campaignsSchema");

exports.getTaskByQuery = async (req, res, next) => {
  try {
    const { _id } = await CampaignModel.findOne(req.query);
    const tasks = await TasksModel.find({ campaign: _id }).populate(
      "created_by"
    );
    return res.status(200).json({ success: true, tasks, campaignId: _id });
  } catch (error) {
    console.log("error in get all campaings is ", error);
    return res.status(200).json({ success: false, message: error.message });
  }
};
