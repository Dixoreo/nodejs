const Users = require("../../models/Register");
exports.updateExpoPushToken = async (req, res) => {
  try {
    let user = await Users.findById(req.user._id);

    if (!user) {
      return res.json({ success: false, message: "user doesnt exist" });
    }

    await Users.updateOne(
      {
        _id: req.user._id,
      },
      {
        $set: {
          expoPushToken: req.body.expoPushToken,
        },
      }
    );

    return res.json({ success: true, expoPushToken: req.body.expoPushToken });
  } catch (error) {
    return res.json({ success: false, message: "internal server error" });
  }
};