const NotificationModel = require("../../models/notification");

exports.changeNotificationType = async (req, res) => {
  console.log("change notification type called");
  try {
    const notificationToUpdate = await NotificationModel.findById(
      req.params.id
    );
    if (!notificationToUpdate) {
      return res.json({
        success: false,
        message: "notification doesn't exist",
      });
    }
    await NotificationModel.updateOne(
      { _id: notificationToUpdate._id },
      {
        $set: {
          "data.title": req.body.title,
        },
      }
    );

    return res.json({ success: true, message: "campaign updated sucessfully" });
  } catch (error) {
    console.log("error in change Notifications type is ", error);
    return res.json({ success: false, message: "internal server error" });
  }
};
