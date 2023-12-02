const MessageModel = require("../../models/messageSchema");
exports.deleteChat = async (req, res) => {
  await MessageModel.findByIdAndDelete(req.params.id);
  return res
    .status(200)
    .json({ success: true, message: "chat deleted successfully" });
};
