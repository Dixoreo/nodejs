const Archives = require("../../models/archivesSchema");
const Groups = require("../../models/groups");

exports.disbandGroup = async (req, res) => {
  try {
    let groupToDisband = await Groups.findById(req.params.id);
    if (!groupToDisband) {
      return res.json({ success: false, message: "invalid id " });
    }

    
    let user = req.user._id;
    let archive = await Archives.create({
      user,
      type: "group",
      data: groupToDisband,
    });

    await Groups.findByIdAndDelete(groupToDisband._id);
    return res.json({ success: true, message: "group disbanded successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "internal server error " });
  }
};
