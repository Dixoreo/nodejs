const chat = require("../../models/chats");

const createchat = async (req, res) => {
  const newchat = new chat({
    messages: req.body.messages,
    members: req.body.members,
  });
  if (!newchat) {
    res.send({ message: "Invalid data body", status: 400 });
  }
  try {
    const savedchat = await newchat.save();
    res.status(200).send(savedchat);
  } catch (err) {
    res.send({ message: err, status: 400 });
  }
};

module.exports = createchat;
