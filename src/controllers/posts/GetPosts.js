const posts = require("../../models/post");
const Users = require("../../models/Register");

exports.getPosts = async (req, res) => {
  const getposts = await posts
    .find()
    .populate("postedby shares", {
      fullName: 1,
      phoneNumber: 1,
      profile: 1,
      followers: 1,
      following: 1,
    })
    .populate({
      path: "comments",
      populate: {
        path: "commented_by",
        select: "profile fullName phoneNumber type",
      },
    });
  let user = await Users.findById(req.user._id);

  //filtering posts i.e checking if the post is from someone who is blocked by user
  let blockedList = user.blockedUsers;
  let blockedBy = user.blockedByUsers;
  let newPosts = getposts.filter((post) => {
    if (
      blockedList?.includes(post.postedby._id) ||
      blockedBy?.includes(post.postedby._id)
    ) {
      return false;
    }
    return true;
  });
  return res.status(200).send(newPosts);
};

exports.postsExperiment = async (req, res) => {

  try {
    let user = await Users.findById(req.user._id);
    const blockedUserIds = [...user.blockedUsers, ...user.blockedByUsers];

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const newPosts = await posts
      .find({ postedby: { $nin: blockedUserIds } })
      .sort({ createdAT: "desc" })
      .populate("postedby shares", {
        fullName: 1,
        phoneNumber: 1,
        profile: 1,
        type: 1,
        followers: 1,
        following: 1,
        expoPushToken: 1,
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
      })
      .skip(startIndex)
      .limit(limit)
      .exec();
    const postsToCount = await posts.find({
      postedby: { $nin: blockedUserIds },
    });
    const count = postsToCount.length;
    const totalPages = Math.ceil(count / limit);
    const currentPage = page;

    // Return the posts and pagination info as JSON response
    return res.json({ totalPages, currentPage, newPosts });
  } catch (err) {
    console.error("error inside get posts is  ", err.message);
    return res.status(500).send("Server error");
  }
};
