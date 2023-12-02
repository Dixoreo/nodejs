const Notification = require("../../models/notification");

//this api will take a list of notifications and create them.

exports.addMultipleNotifications = async (req, res) => {
  try {
    let { notifications } = req.body;
    let newNotifications = await Notification.create(notifications);
    return res.json({ success: true, newNotifications });
  } catch (error) {
    return res.json({ success: false, message: "internal server error" });
  }
};
