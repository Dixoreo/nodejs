const Groups = require("../models/groups");
const Users = require("../models/Register");
const { sendNotifications } = require("./sendNotifications");
exports.sendGroupMessageNotifications = async (data) => {
  try {
    //nested destructuring to get the sender out from data
    let {
      id: groupId,
      message: { from },
    } = data;
    // console.log("from is ", from);

    let group = await Groups.findById(groupId).select("members");
    if (!group) {
      return;
    }
    //  console.log("group members are ", group);
    //including everyone except the sender of message

    //filter only the receipiants
    //then returns phone numbers of those users
    ///these phone numbers will be used to query users databse to find push tokens

    let phoneNumbers = group.members
      .filter((m) => m.phoneNumber !== from.phoneNumber)
      .map((m) => m.phoneNumber);
    //  console.log("phone numbers are ", phoneNumbers);

    //now finding complete users details from user models to have access to the ExpoPushToken
    let users = await Users.find({ phoneNumber: { $in: phoneNumbers } });

    //filters uses who have push token
    //then return array of those tokens
    let tokens = users
      .filter((u) => u.expoPushToken)
      .map((u) => u.expoPushToken);
    // console.log("users are ", users);
    // console.log("tokens are ", tokens);

    //finally sending notifications

    sendNotifications(tokens, `${from.phoneNumber} sent a message`);
  } catch (error) {
    console.log(error);
  }
};
