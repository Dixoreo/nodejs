const Users = require("../../models/Register");

//this route will return all the users
//except those users who have blocked the user who has requested or who the requested users have blocked
exports.newChatContacts = async (req, res) => {
  try {
    let activeUser = await Users.findById(req.user._id);
    let blockedUsers = activeUser.blockedUsers;
    let blockedByUsers = activeUser.blockedByUsers;

    let exculde = [...blockedByUsers, ...blockedUsers];
    let contacts = await Users.find(
      { phoneNumber: { $nin: exculde } } // here exculde those chats where users have blocked each other
    );

    return res.json({ success: true, contacts });
  } catch (error) {
    console.log("error in new chat contacts :: ", error);
    return res.json({ success: true, message: "internal server error" });
  }
};
