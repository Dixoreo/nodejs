const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema({
  orderItems: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "NewUsers",
    required: true,
  },

  assigned_to: {
    type: Schema.Types.ObjectId,
    ref: "NewUsers",
  },

  shippingAddress: {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },

  paymentMode: {
    type: String,
    enum: ["COD", "credit card"],
    required: true,
  },

  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["processing", "shipped", "delivered"],
    default: "processing",
  },
  deliveryInstructions: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", schema);
