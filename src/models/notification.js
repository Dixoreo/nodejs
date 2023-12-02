const mongoose = require("mongoose");

const dbSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NewUsers",
    required: true,
  },
  body: {
    type: (body = {}),
    required: true,
  },
  data: {
    title: {
      type: String,
    },
    token: {
      type: String,
    },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: function () {
        if (
          this.data.title === "campaign-invite" ||
          this.data.title === "campaign-invite-accepted" ||
          this.data.title === "campaign-invite-rejected"
        )
          return "Campaigns";
        if (
          this.data.title === "post-comment" ||
          this.data.title === "post-like" ||
          this.data.title === "post-share"
        )
          return "post";
      },
    },
  },
});

const newnotification = new mongoose.model("Notifications", dbSchema);

module.exports = newnotification;
