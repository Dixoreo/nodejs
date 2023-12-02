const GroupsModel = require("../models/groups");
const GroupMessageModel = require("../models/groupMessageSchema");

const sendmessage = async (data) => {
  try {
    const groupdata = await GroupsModel.findById(data.group);
    if (!data.group) {
      console.log("invalid data");
    } else {
      try {
        const _id = data.group;
        const messages = groupdata.messages;
        const newMessage = await GroupMessageModel.create({
          ...data,
        });
        messages.push(newMessage._id);

        const updategroup = await GroupsModel.findByIdAndUpdate(
          _id,
          { messages: messages },
          {
            new: true,
          }
        )
        .populate({ path: "members.member" , select:"fullName phoneNumber profile type" })
        .populate({
          path:"messages",
          populate:{
            path: "from",
            select:"profile fullName phoneNumber type"
          }
        })
        if (!updategroup) {
          return "internal server error";
        } else {
          return updategroup;
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
