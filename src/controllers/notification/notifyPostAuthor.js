const Posts = require("../../models/post");
const Users = require("../../models/Register");
const Notifications = require("../../models/notification");
const { sendNotifications } = require("../../services/sendNotifications");
const { Expo } = require("expo-server-sdk");
const expo = new Expo();
exports.notifyPostAuthor = async (req, res) => {
  // const expoPushToken = req.body.data.token;
  try {
    // const message = {
    //   to: "ExponentPushToken[dftyj9Dxnb1bU3-HaS5U4u]",
    //   sound: "default",
    //   title: "New Notification",
    //   body: "Hello, this is a push notification from your backend!",
    //   data: { customData: { foo: "bar" } },
    // };
    // expo
    //   .sendPushNotificationsAsync([message])
    //   .then((ticketReceipts) => {
    //     // Process the ticket receipts for each successful or failed notification
    //     // For example, you can iterate over the receipts and check the status of each notification
    //     for (const receiptId in ticketReceipts) {
    //       const { status, message } = ticketReceipts[receiptId];
    //       if (status === "ok") {
    //         console.log(`Notification sent successfully, ID: ${receiptId}`);
    //       } else {
    //         console.error(
    //           `Failed to send notification, ID: ${receiptId}, Error: ${message}`
    //         );
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error sending push notification:", error);
    //   });

    const pushToken = req.body.body.user.expoPushToken;
    let title = "";
    let message = "";
    console.log(req.body);
    console.log(Expo.isExpoPushToken(pushToken));
    if (Expo.isExpoPushToken(pushToken)) {
      const expo = new Expo(); // Create an Expo SDK client
      if (req.body.data.title === "post-like") {
        title = "New like";
        message = `${req.body.body.user.fullName} liked your post`;
      } else if (req.body.data.title === "post-comment") {
        title = "New Comment";
        message = `${req.body.body.user.fullName} commented on your post`;
      } else if (req.body.data.title === "post-share") {
        title = "New Share";
        message = `${req.body.body.user.fullName} shared your post`;
      } else if (req.body.data.title === "campaign-invite") {
        title = "New Invitation";
        message = `${req.body.body.user.fullName} Invited you to a campaign`;
      }
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
    //1-we would receive a post id here
    //2-from the post id we will extract the number of posted by
    //3-from that number we will extract the expo token of the person
    //4-then we will send the notification to that person and also add a notification

    // #2
    let post = await Posts.findById(req.params.id).populate("postedby");
    let user = await Users.findOne({ phoneNumber: post.postedby.phoneNumber }); //this is the user who was the author of post

    // if (user.expoPushToken) {
    //   //send notification
    //   sendNotifications([user.expoPushToken], req.body.title);
    // }

    //save the notification into the database

    await Notifications.create({
      user: post.postedby._id,
      body: req.body.body,
      data: req.body.data,
    });

    return res.json({
      success: true,
      message: "notification succes",
    });
  } catch (error) {
    console.log("error inside notify post author is ", error);
    return res.json({ success: false, error });
  }
};
