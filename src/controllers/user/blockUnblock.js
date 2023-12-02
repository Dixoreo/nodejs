const Users = require("../../models/Register");

//TODO ::
// we will receive a phone number as param
// find the user from that phone number and add that user to the block list
// update that users blockedBy and add the user details their

//after all of that is done update the get all posts api to only send valid posts

exports.blockUser = async (req, res) => {
  try {
    let userToBlock = await Users.findById(req.params.id); // user who is to be blocked
    let userWhoIsBlocking = await Users.findById(req.user._id); // this is user who is making request

    console.log("user to block ==>", userToBlock);
    console.log("user who is blocking ==> ", userWhoIsBlocking);

    let blockedUsersList = userWhoIsBlocking.blockedUsers || [];
    let blockedByUsersList = userToBlock.blockedByUsers || [];

    console.log(userToBlock._id);
    console.log(userWhoIsBlocking._id);
    //add the user to the blocked list
    blockedUsersList.push(userToBlock._id);
    blockedByUsersList.push(userWhoIsBlocking._id);

    //updating user who is Blocking
    let test1 = await Users.findByIdAndUpdate(
      userWhoIsBlocking._id,

      {
        blockedUsers: blockedUsersList,
        //below line is for resetting
        //blockedUsers : []
      },
      { new: true }
    );
    //updating user who is to be blocked
    let test2 = await Users.findByIdAndUpdate(
      userToBlock._id,

      {
        blockedByUsers: blockedByUsersList,
        //below line is for resetting
        //blockedByUsers : []
      },
      {
        new: true,
      }
    );
    return res.json({ success: true, test1, test2 });
  } catch (error) {
    console.log("BLOCK USER CONTROLLER ERROR === ", error);
    return res.json({ success: false, message: "internal server error" });
  }
};

exports.unblockUser = async (req, res) => {
  console.log("unblocked called");
  try {
    let userToUnblock = await Users.findById(req.params.id); // user who is to be unblocked
    let userWhoIsUnblocking = await Users.findById(req.user._id); // this is user who is making request

    let blockedUsersList = userWhoIsUnblocking.blockedUsers;
    let blockedByUsersList = userToUnblock.blockedByUsers;

    //updating blockedList
    blockedUsersList = blockedUsersList.filter((p) => {
      return p.toString() !== userToUnblock._id.toString();
    });

    //updating blocedByUsers list
    blockedByUsersList = blockedByUsersList.filter(
      (p) => p.toString() !== userWhoIsUnblocking._id.toString()
    );

    //updating user who is unBlocking
    let test1 = await Users.findByIdAndUpdate(
      userWhoIsUnblocking._id,

      {
        blockedUsers: blockedUsersList,
        //below line is for resetting
        //blockedUsers : []
      },
      { new: true }
    );
    //updating user who is to be unblocked
    let test2 = await Users.findByIdAndUpdate(
      userToUnblock._id,

      {
        blockedByUsers: blockedByUsersList,
        //below line is for resetting
        //blockedByUsers : []
      },
      {
        new: true,
      }
    );

    return res.json({ success: true, blockedList: test1.blockedUsers });
  } catch (error) {
    console.log("BLOCK USER CONTROLLER ERROR === ", error);
    return res.json({ success: false, message: "internal server error" });
  }
};

let counter = 0;

//getting list of blocked users
exports.getBlockedUsers = async (req, res) => {
  console.log("get blocked hit ", ++counter, " times ");
  try {
    const user = await Users.findById(req.user._id)
      .populate("blockedUsers", "fullName phoneNumber profile")
      .select("blockedUsers");

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("get blocked USER CONTROLLER ERROR === ", error);
    return res.json({ success: false, message: "internal server error" });
  }
};
