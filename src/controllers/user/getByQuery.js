const UserModel = require("../../models/Register");

exports.getUserByQuery = async (req, res) => {
  try {
    const users = await UserModel.find(req.query);
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.log("error in getusuerbyquery ", error);
    return res.status(500).json({ success: true, message: error.message });
  }
};
