const { Expo } = require("expo-server-sdk");
const model = require("../../models/post");
const notificationService = require("../../services/sendNotifications");

const updatepost = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Invalid id");
  } else {
    try {
      const _id = req.params.id;
      const updatedpost = await model.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      const posts = await model
        .find({ _id: _id })
        .populate("postedby shares", {
          fullName: 1,
          phoneNumber: 1,
          profile: 1,
          followers: 1,
          following: 1,
          expoPushToken: 1,
        })
        .populate({
          path: "comments",
          populate: {
            path: "commented_by",
            select: "profile fullName phoneNumber ",
          },
        })
        .populate({
          path: "reactions",
          select: "profile fullName phoneNumber",
          model: "NewUsers",
        });

      if (!updatedpost) {
        res.status(500).send(posts[0]);
      } else {
        // const pushToken = "ExponentPushToken[dftyj9Dxnb1bU3-HaS5U4u]";
        // const title = "Congratulations Umar Bhai";
        // const message = "Onces more ";

        // if (Expo.isExpoPushToken(pushToken)) {
        //   const expo = new Expo(); // Create an Expo SDK client

        //   const messageData = {
        //     to: pushToken,
        //     sound: "default",
        //     title,
        //     body: message,
        //   };

        //   expo
        //     .sendPushNotificationsAsync([messageData])
        //     .then((tickets) => {
        //       console.log("Notification sent:", tickets);
        //     })
        //     .catch((error) => {
        //       console.error("Error sending notification:", error);
        //     });
        // }

        res.status(200).send(posts[0]);
      }
    } catch (e) {
      res.status(400).send("Invalid data body");
    }
  }
};

module.exports = updatepost;
