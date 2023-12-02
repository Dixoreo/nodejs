const posts = require("../../models/post");
const Users = require("../../models/Register");

const getPost = async (req, res) => {
  try {
    const getpost = await posts
      .find({ _id: req.body.id })
      .populate("postedby shares", {
        fullName: 1,
        phoneNumber: 1,
        profile: 1,
        type: 1,
        followers: 1,
        following: 1,
        expoPushToken: 1,
        sharedBy: 1,
      })
      .populate({
        path: "comments",
        populate: {
          path: "commented_by",
          select: "profile fullName phoneNumber type",
        },
      })
      .populate({
        path: "reactions",
        select: "profile fullName phoneNumber type",
        model: "NewUsers",
      });

    if (getpost && getpost.length > 0) {
      return res.status(200).send(getpost[0]);
    } else {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getPost;
