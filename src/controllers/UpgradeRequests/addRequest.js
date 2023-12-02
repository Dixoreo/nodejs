const UpgradeRequests = require("../../models/accountUpgradeSchema");

// ROUTE-1 FOR USER
exports.addRequest = async (req, res) => {
  try {
    let user = req.user._id;
    const { requestedRole, instagramProfile, facebookProfile, twitterProfile } =
      req.body;

    if (
      requestedRole === "celebrity" &&
      (!instagramProfile || !facebookProfile || !twitterProfile)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "provide all social links" });
    }
    await UpgradeRequests.create({ ...req.body, user });
    return res.json({
      success: true,
      message: "request submitted successfully",
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
