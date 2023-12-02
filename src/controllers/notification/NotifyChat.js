const Posts = require("../../models/post");
const Users = require("../../models/Register");
const Notifications = require("../../models/notification");
const { Expo } = require("expo-server-sdk");
const expo = new Expo();
const notifyChat = async (req, res) => {
  try {
    //{fullName,expoPushtoken}
    const pushToken = req.body.expoPushToken;
    let title = "New Message";
    let message = `${req.body.fullName} send you a message`;

    if (Expo.isExpoPushToken(pushToken)) {
      const messageData = {
        to: pushToken,
        sound: "default",
        title,
        body: message,
      };
      try {
        expo.sendPushNotificationsAsync([messageData]).then((tickets) => {
          console.log("Notification sent:", tickets);
        });
      } catch (error) {
        console.log(error);
      }
    }
    return res.json({
      success: true,
      message: "notification succes",
    });
  } catch (error) {
    console.log("error inside notify chat is ", error);
    return res.json({ success: false, error });
  }
};

module.exports = notifyChat