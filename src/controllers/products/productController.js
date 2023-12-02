const ProductsModel = require("../../models/product");
const UserModel = require("../../models/Register");

//ROUTE : 1 /product/create
exports.createProduct = async (req, res) => {
  try {
    let image;
    if (req.file) {
      image = `/images/${req.file.filename}`;
    }
    const { title, price, stock, deal_quantity } = req.body;
    const product = await ProductsModel.create({
      title,
      price,
      stock,
      image,
      deal_quantity,
      posted_by: req.user._id,
    });

    //increasing points of the user
    await UserModel.findByIdAndUpdate(req.user._id, {
      $inc: { points: 10 },
    });
    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};
//ROUTE: 2 /product/get
exports.getProducts = async (req, res) => {
  try {
    const products = await ProductsModel.find();
    return res.status(200).json({ success: true, products });
  } catch (error) {}
};

//ROUTE 3 : /product/update/:id
exports.updateProduct = async (req, res) => {
  try {
    const productToUpdate = await ProductsModel.findById(req.params.id);
    const { title, price, stock, deal_quantity } = req.body;
    if (!productToUpdate) {
      return res
        .status(400)
        .json({ success: false, message: "no product found to update" });
    }
    let update = {};

    if (title) update.title = title;
    if (price) update.price = price;
    if (stock) update.stock = stock;
    if (deal_quantity) update.deal_quantity = deal_quantity;
    let image;
    if (req.file) {
      image = `/images/${req.file.filename}`;
      update.image = image;
    }

    const updatedProduct = await ProductsModel.findOneAndUpdate(
      { _id: productToUpdate._id },
      { $set: update },
      { new: true, runValidators: true }
    );
    return res.status(200).json({ success: true, updatedProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//ROUTE : 4  /product/delete/:id

exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedProd = await ProductsModel.findByIdAndDelete(req.params.id);

    console.log(filePath);
    return res
      .status(200)
      .json({ success: true, message: "deleted successfully" });
  } catch (error) {
    console.log("error from deleteProduct", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
