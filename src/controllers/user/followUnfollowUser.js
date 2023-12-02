const Users = require("../../models/Register");
exports.followUnfollowUser = async (req, res) => {
  try {
    //
    let followerUser = await Users.findById(req.user._id); // user who is performing follow action
    let followingUser = await Users.findOne({ phoneNumber: req.params.id }); //user who is to be followed

    let followersList = followingUser.followers;
    let followingList = followerUser.following;

    if (!followerUser || !followingUser) {
      return res.json({ success: false, message: "could not find users" });
    }

    //if user is trying to follow himself
    if (followerUser.phoneNumber === followingUser.phoneNumber) {
      return res.json({ success: false, message: "cannot follow yourself" });
    }

    //check if already following that user
    let i = followingList.findIndex(
      (e) => e.phoneNumber === followingUser.phoneNumber
    );
    let followerIndex;

    if (i > -1) {
      //THIS BLOCK HANDLES UNFOLLOW

      //now find index of  user from followers
      followerIndex = followersList.findIndex(
        (e) => e.phoneNumber === followerUser.phoneNumber
      );

      //now remove both users from lists
      followingList.splice(i, 1);
      followersList.splice(followerIndex, 1);
    } else {
      //THIS BLOCK HANDLES FOLLOW
      followersList.push({
        profile: followerUser.profile,
        fullName: followerUser.fullName,
        phoneNumber: followerUser.phoneNumber,
        type: followerUser.type,
      });

      followingList.push({
        profile: followingUser.profile,
        fullName: followingUser.fullName,
        phoneNumber: followingUser.phoneNumber,
        type: followingUser.type,
      });
    }

    let userWhoIsFollowing = await Users.findByIdAndUpdate(
      followerUser._id,
      {
        following: followingList,
      },
      {
        new: true,
      }
    );

    let userWhoIsFollowed = await Users.findByIdAndUpdate(
      followingUser._id,
      {
        followers: followersList,
      },
      {
        new: true,
      }
    );
    return res.json({ success: true, following: userWhoIsFollowing.following });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "some error occured" });
  }
};
