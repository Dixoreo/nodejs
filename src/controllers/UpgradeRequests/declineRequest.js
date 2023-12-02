const UpgradeRequests = require("../../models/accountUpgradeSchema");

exports.declineRequest = async (req, res) => {
  try {
    let id = req.params.id;

    const { declinedReason } = req.body;

    //finding request
    let request = await UpgradeRequests.findById(id);
    if (!request) {
      return res.json({ success: false, message: "request does not exist" });
    }

    //deleting request

    await UpgradeRequests.findByIdAndUpdate(request._id, {
      status: "declined",
      declinedReason
    });

    return res.json({
      succes: true,
      message: " request declined successfully",
    });
  } catch (error) {
    console.log("error is ", error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};
