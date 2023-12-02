const UserModel = require("../../models/Register");

const categoryToPoints = (category) => {
  //category names should math exactly with the front-end
  switch (category) {
    case "Posts":
      return 10;
    case "Campaigns Volunteering":
      return 20;
    case "Order Volunteering":
      return 30;
    case "Bonus":
      return 40;

    default:
      return undefined;
  }
};

exports.awardPoints = async (req, res) => {
  try {
    const { phoneNumber, category } = req.body;
    const user = await UserModel.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ success: false, message: "no user exist" });
    }

    const points = categoryToPoints(category);

    if (!points)
      return res
        .status(400)
        .json({ success: false, message: "invalid category" });

    await UserModel.findOneAndUpdate(
      { phoneNumber },
      {
        $inc: { points: points },
      }
    );
    return res
      .status(200)
      .json({ success: true, message: "points awarded successfully" });
  } catch (error) {
    console.log("error in award points api:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
