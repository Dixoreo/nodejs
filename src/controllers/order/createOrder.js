const OrderModel = require("../../models/Order");
const ProductModel = require("../../models/product");
const UserModel = require("../../models/Register");
const mongoose = require("mongoose");

//utility function
const calculatePrice = async (orderItems) => {
  let price = 0;
  for (let i = 0; i < orderItems.length; i++) {
    const element = orderItems[i];

    const product = await ProductModel.findById(element.product);
    if (product.stock < element.quantity)
      throw Error(`${product.title} has only ${product.stock} items in stock`);
    const individualItemPrice = product.price * element.quantity;
    price += individualItemPrice;
  }
  return price;
};

async function createOrderAndUpdateProducts(orderData, productData) {
  let session = null;

  try {
    // Start a new session
    session = await mongoose.startSession();
    session.startTransaction();

    // Create a new order
    const order = await OrderModel.create([orderData], { session });

    // Update the product documents
    for (const data of productData) {
      await ProductModel.findByIdAndUpdate(
        data.product,
        {
          $inc: { stock: -data.quantity },
        },
        { session }
      );
    }

    // Commit the transaction
    await session.commitTransaction();

    return order[0];
  } catch (error) {
    // If an error occurs, abort the transaction
    if (session) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    // End the session
    if (session) {
      session.endSession();
    }
  }
}

//ROUTE:1  creating an order
//once the order is created then this route will also create
exports.createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMode, deliveryInstructions } =
      req.body;
    //calculating total price
    const totalPrice = await calculatePrice(orderItems);

    let session = await mongoose.startSession();
    session.startTransaction();

    const createdOrder = await createOrderAndUpdateProducts(
      {
        orderItems,
        shippingAddress,
        totalPrice,
        paymentMode,
        deliveryInstructions,
        user: req.user._id,
      },
      orderItems
    );
    //increasing points of the user
    await UserModel.findByIdAndUpdate(req.user._id, {
      $inc: { points: 15 },
    });

    return res.status(200).json({ success: true, order: createdOrder });
  } catch (error) {
    console.log("error from createOrder", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
