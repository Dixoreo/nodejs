const { Expo } = require("expo-server-sdk");
const expo = new Expo();
const notifyGroup = async (req, res) => {
  try {
    // const pushToken = req.body.expoPushToken;
    let title = "New Message";
    let message = ``;
//[{token,fullname}]
    if (Expo.isExpoPushToken(pushToken)) {
      
      req.body.something.map((body)=>{
        const pushToken = body.token;
        message = `${body.fullName} sent you a message`
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
      })
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

module.exports = notifyGroup
