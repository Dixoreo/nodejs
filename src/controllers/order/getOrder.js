const OrderModel = require("../../models/Order");
const UserMdoel = require("../../models/Register");

exports.getOrder = async (req, res) => {
  try {
    let activeUser = await UserMdoel.findById(req.user._id);
    let orders;
    if (activeUser.type === "user") {
      orders = await OrderModel.find({ user: req.user._id })
        .populate({
          path: "orderItems.product",
          select: "title image price deal_quantity",
        })
        .populate({
          path: "user",
          select: "profile fullName",
        });
    } else {
      orders = await OrderModel.find()
        .populate({
          path: "orderItems.product",
          select: "title image price deal_quantity",
        })
        .populate({
          path: "user",
          select: "profile fullName",
        });
    }
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log("error from getOrders", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
