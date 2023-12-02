const model = require("../../models/chats");
const updatechat = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Invalid id");
  } else {
    try {
      const _id = req.params.id;
      const updatechat = await model.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      if (!updatechat) {
        res.status(500).send("internal server error");
      } else {
        res.status(200).send(updatechat);
      }
    } catch (e) {
      res.status(400).send("Invalid data body");
    }
  }
};

module.exports = updatechat;
