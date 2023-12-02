const router = require("express").Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/products/productController");
const verify = require("../middlewares/Auth");
const upload = require("../middlewares/ImageUploader/ImageUploader");

router.post("/create", verify, upload.single("image"), createProduct);
router.get("/get", verify, getProducts);
router.patch("/update/:id", verify, upload.single("image"), updateProduct);
router.delete("/delete/:id", verify, deleteProduct);

module.exports = router;
