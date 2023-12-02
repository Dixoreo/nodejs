const GroupsModel = require("../../models/groups");
const CampaignsModel = require("../../models/campaignsSchema");
const TasksModel = require("../../models/tasksSchema");

exports.deleteTask = async (req, res, next) => {
  try {
    let count = await TasksModel.countDocuments();
    await TasksModel.findOneAndDelete({ _id: req.query.taskId });
    count = await TasksModel.countDocuments();
    const tasks = await TasksModel.find({
      campaign: req.params.campaignId,
    }).populate("created_by", "fullName");
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.log("error in delete task is ", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
