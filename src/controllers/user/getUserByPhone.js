const UserModel = require("../../models/Register");
exports.getUserByPhone = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      phoneNumber: req.params.phoneNumber,
    });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
