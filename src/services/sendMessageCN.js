const chat = require("../models/chats");
const MessageModel = require("../models/messageSchema");

const sendmessage = async (data) => {
  try {
    const chatdata = await chat.findById(data.chat);

    if (!data.chat) {
      console.log("invalid data");
    } else {
      try {
        const _id = data.chat;
        const messages = chatdata.messages;
        const newMessage = await MessageModel.create({
          ...data,
        });
        messages.push(newMessage._id);

        const updatechat = await chat
          .findByIdAndUpdate(
            _id,
            { messages: messages },
            {
              new: true,
              populate: "members",
            }
          )
          .populate("members")
          .populate("messages");

        console.log("update chat ----> ", updatechat);
        if (!updatechat) {
          return "internal server error";
        } else {
          return updatechat;
        }
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendmessage;
