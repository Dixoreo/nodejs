const users = require("../../models/Register");

const getusers = async (req, res) => {
  try {
    const newusers = await users.find();
    res.status(200).send(newusers);
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = getusers;
