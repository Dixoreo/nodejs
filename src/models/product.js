const mongoose = require("mongoose");
const dbSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter a title"],
  },
  price: {
    type: Number,
    required: [true, "please enter some price"],
  },
  deal_quantity: {
    type: Number,
  },
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NewUsers",
    required: true,
  },
  stock: {
    type: Number,
    required: [true, "please enter available stock"],
  },
  image: {
    type: String,
    required: true,
  },
});

const product = new mongoose.model("Product", dbSchema);

module.exports = product;
