const TasksModel = require("../../models/tasksSchema");
exports.editTask = async (req, res, next) => {
  const { taskId, ...updateObject } = req.body;
  try {
    await TasksModel.findByIdAndUpdate(taskId, updateObject);
    const tasks = await TasksModel.find({
      campaign: req.params.campaignId,
    }).populate("created_by", "fullName");

    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.log("error in edit task is ", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
