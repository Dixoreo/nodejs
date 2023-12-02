const Archives = require("../../models/archivesSchema");
//this function will give us list of all the disbanded
//groups by the user who has sent the request

exports.getDisbandedGroups = async (req, res) => {
  try {
    let groups = await Archives.find({ user: req.user._id, type: "group" });
    return res.json({ succes: true, groups });
  } catch (error) {
    return res.json({ success: false, message: "internal server error " });
  }
};
