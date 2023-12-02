const Archives = require("../../models/archivesSchema");
const Posts = require("../../models/post");

exports.addArchivePost = async (req, res) => {
  try {
    let user = req.user._id;
    if (!req.params.id) {
      return res.json({ success: false, message: "invalid id " });
    }

    // Find post
    let archive = await Posts.findById(req.params.id);

    // Create an archive entry for the post
    let archivePost = await Archives.create({
      user,
      type: "post",
      data: archive,
    });

    // Delete the post
    await Posts.findByIdAndDelete(archive._id);

    return res.json({ success: true, message: "archived successfully" });
  } catch (error) {
    return res.json({ success: false, message: "internal server error " });
  }
};
