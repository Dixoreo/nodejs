const router = require("express").Router();
const { deleteOrder } = require("../controllers/order/deleteOrder");
const { getOrder } = require("../controllers/order/getOrder");
const { createOrder } = require("../controllers/order/createOrder");
const verify = require("../middlewares/Auth");
router.post("/create", verify, createOrder);
router.get("/get", verify, getOrder);
router.delete("/delete/:id", verify, deleteOrder);

module.exports = router;
