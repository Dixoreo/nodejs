const Archives = require("../../models/archivesSchema");

exports.getArchivePosts = async (req, res) => {
  try {
    let posts = await Archives.find({ user: req.user._id, type: "post" });
    return res.json({ success: true, posts });
  } catch (error) {
    return res.json({ success: false, message: "internal server error " });
  }
};
