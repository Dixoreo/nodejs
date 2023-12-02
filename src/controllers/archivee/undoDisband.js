const Groups = require("../../models/groups");
const Archives = require("../../models/archivesSchema");
//this function will remove the group from archives
//and move it back to the groups collection

exports.undoDisband = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.json({ success: false, message: "invalid id " });
    }
    //find group
    let archivedGroup = await Archives.findById(req.params.id);

    const { _id, __v, ...properties } = archivedGroup.data;
    await Groups.create(properties);
    await Archives.findByIdAndDelete(archivedGroup._id);
    return res.json({ success: true, message: "Group un-ban successfully" });

  } catch (error) {
    return res.json({ success: false, message: " internal server error " });
  }
};
