const router = require("express").Router();

const { createBucket } = require("../controllers/buckets/create");
const { getBuckets } = require("../controllers/buckets/get");
const verify = require("../middlewares/Auth");

router.post("/create", verify, createBucket);
router.get("/get", verify, getBuckets);

module.exports = router;
