const UpgradeRequests = require("../../models/accountUpgradeSchema");

exports.getAllUpgradeRequests = async (req, res) => {
  try {
    let requests = await UpgradeRequests.find({ status: "pending" }).populate(
      "user"
    );
    return res.json({ success: true, requests });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};
