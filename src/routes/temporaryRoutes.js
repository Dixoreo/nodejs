const router = require("express").Router();

const Users = require("../models/Register");
const Posts = require("../models/post");
const Groups = require("../models/groups");
const Dodays = require("../models/To-Day");
const Notifications = require("../models/notification");
const MessageMediaUploader = require("../middlewares/MessageMediaUploader/MessageMediaUploader");

const verify = require("../middlewares/Auth");
//get users
router.get("/getallusers", async (req, res) => {
  console.log("get all usres called");
  try {
    const users = await Users.find();

    return res.send({ success: true, users });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
});

//delete user

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    //find user to be deleted
    let userToBeDeleted = await Users.findById(req.params.id);

    if (!userToBeDeleted) {
      return res.status(500).json({
        success: false,
        message: "User does not exist",
      });
    }
    //deleting the user

    await Users.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
      message: "user deleted sucessfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
});

//get posts
router.get("/getallposts", verify, async (req, res) => {
  try {
    let posts = await Posts.find();
    let count = await Posts.find().count();
    let user = await Users.findById(req.user._id);
    let blockedList = user.blockedUsers;
    let blockedBy = user.blockedByUsers;

    let newPosts = posts.filter((post) => {
      if (
        blockedList.includes(post.postedby.phoneNumber) ||
        blockedBy.includes(post.postedby.phoneNumber)
      ) {
        return false;
      }
      return true;
    });
    return res.json({ success: true, count, newPosts });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
});

//delete post

router.delete("/deletepost/:id", async (req, res) => {
  try {
    //find user to be deleted
    let postToBeDeleted = await Posts.findById(req.params.id);

    if (!postToBeDeleted) {
      return res.status(500).json({
        success: false,
        message: "Post does not exist",
      });
    }
    //deleting the user

    await Posts.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
      message: "Post deleted sucessfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
});

//get all groups
router.get("/getallgroups", async (req, res) => {
  try {
    let groups = await Groups.find();
    return res.json({ success: true, groups });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
});

//get all do days
router.get("/getalldodays", async (req, res) => {
  console.log("get all todays called");
  try {
    let dodays = await Dodays.find();
    return res.json({ success: true, dodays });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
});

//delete do day

router.delete("/deletedoday/:id", async (req, res) => {
  try {
    //find user to be deleted
    let dodayToBeDeleted = await Dodays.findById(req.params.id);

    if (!dodayToBeDeleted) {
      return res.status(500).json({
        success: false,
        message: "do day does not exist",
      });
    }
    //deleting the user

    await Dodays.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
      message: "do-day deleted sucessfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
});

//uploading audios
router.post(
  "/uploadDocuments",
  MessageMediaUploader.single("document"),
  async (req, res) => {
    try {
      return res.json({
        success: true,
        message: "fie uploaded sucessfully ",
        path: req.file.filename,
      });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: error });
    }
  }
);

//update user
router.put("/updateUserLocation/:id", async (req, res) => {
  try {
    let user = await Users.findById(req.params.id);

    if (!user) {
      return res.json({ success: false, message: "user doesnt exist" });
    }

    await Users.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          location: req.body.location,
        },
      }
    );

    return res.json({ success: true, message: "updated successfully" });
  } catch (error) {
    console.log("error is ", error.message);
    return res.status(500).json({
      success: false,
      messaage: error.message,
    });
  }
});

//update user expo token
router.put("/updateUserExpoToken/:id", async (req, res) => {
  try {
    let user = await Users.findById(req.params.id);

    if (!user) {
      return res.json({ success: false, message: "user doesnt exist" });
    }

    await Users.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          expoPushToken: req.body.expoPushToken,
        },
      }
    );

    return res.json({ success: true, message: "updated successfully" });
  } catch (error) {
    return res.json({ success: false, error });
  }
});
//drop do-day

router.delete("/dropDoDay", async (req, res) => {
  try {
    await Dodays.remove({});
    return res.json({ success: true, message: "doday deleted succsesfully" });
  } catch (error) {
    return res.json({ success: false, message: "internal server error" });
  }
});

router.delete("/dropPosts", async (req, res) => {
  try {
    await Posts.remove({});
    return res.json({ success: true, message: "posts deleted" });
  } catch (error) {
    return res.json({ success: false, message: "internal server error" });
  }
});

router.delete("/dropNotifications", async (req, res) => {
  try {
    await Notifications.remove({});
    return res.json({ success: true, message: "notifications cleard " });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
});

//reset blocked and unblocked of all the users

router.patch("/reset-blockedList", async (req, res) => {
  await Users.updateMany({}, { blockedUsers: [], blockedByUsers: [] });
});
module.exports = router;
