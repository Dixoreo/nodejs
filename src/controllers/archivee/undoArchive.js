const Posts = require("../../models/post");
const Archives = require("../../models/archivesSchema");
//here remove the post from archive collection
//and move back to the posts collection

exports.undoArchive = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.json({ success: false, message: "invalid id " });
    }

    //find post
    let archivedPost = await Archives.findById(req.params.id);

    //excluding irrelevant information and using remaining feilds for post
    const { _id, __v, ...properties } = archivedPost.data;

    await Posts.create(properties);
    await Archives.findByIdAndDelete(archivedPost._id);
    return res.json({ success: true, message: "post unarchive successfully" });
  } catch (error) {
    return res.json({ success: false, message: "internal server error" });
  }
};
