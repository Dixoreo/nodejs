const notification = require("../../models/notification");
const UsersModel = require("../../models/Register");
const getnotifications = async (req, res) => {
  console.log("get notifies called");
  try {
    let activeUser = await UsersModel.findById(req.user._id);

    const notifications = await notification
      .find({
        user: activeUser.phoneNumber,
      })
      .populate("data.content");
    res.status(200).send(notifications);
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
};
let counter = 0;

const getNoties = async (req, res) => {
  try {
    let { page, limit } = req.query;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const activeUser = await UsersModel.findById(req.user._id);

    const notifications = await notification
      .find({
        user: req.user._id,
      })
      .populate("data.content")
      .skip(startIndex)
      .limit(limit);

    const totalItems = await notification.countDocuments({
      user: req.user._id,
    });
    const totalPages = Math.ceil(totalItems / limit);
    return res
      .status(200)
      .json({ notifications, page: parseInt(page), totalPages });
  } catch (error) {
    console.log("error from get notificains is ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//module.exports = getnotifications;
module.exports = getNoties;
