const PostsModel = require("../../models/post");
const UserModel = require("../../models/Register");

exports.getUserPosts = async (req, res) => {
  try {
    let { page, limit } = req.query;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const user = await UserModel.findOne({
      phoneNumber: req.params.phoneNumber,
    });
    const posts = await PostsModel.find({ postedby: user._id })
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
        model: "NewUsers", // Specify the model to use for population
      })
      .skip(startIndex)
      .limit(limit);

    const totalItems = await PostsModel.countDocuments({ postedby: user._id });
    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).send({ posts, totalPages });
  } catch (error) {
    console.log("error is  ", error);
  }
};
