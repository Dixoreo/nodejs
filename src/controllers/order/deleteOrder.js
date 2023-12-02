const OrderModel = require("../../models/Order");

exports.deleteOrder = async (req, res, next) => {
  try {
    await OrderModel.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "deleted successfully" });
  } catch (error) {
    console.log("error from deleteOrder", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
