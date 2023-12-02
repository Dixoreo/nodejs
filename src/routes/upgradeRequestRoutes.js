const router = require("express").Router();
const { addRequest } = require("../controllers/UpgradeRequests/addRequest");
const {
  approveRequest,
} = require("../controllers/UpgradeRequests/approveRequest");
const {
  declineRequest,
} = require("../controllers/UpgradeRequests/declineRequest");
const {
  getAllUpgradeRequests,
} = require("../controllers/UpgradeRequests/getAllRequests");
const verify = require("../middlewares/Auth");

router.post("/addRequest", verify, addRequest);

//TODO : AUTHORIZATION MIDDLEWARE MAY BE REQUIRED IN FUTURE FOR ALL BELOW REQUESTS
router.get("/getAllRequests", getAllUpgradeRequests);

//both the decline and accept routes will eventually delete the particular request
router.patch("/declineRequest/:id", declineRequest);

//this will modify the user type and then delete the request
router.patch("/approveRequest/:id", approveRequest);

module.exports = router;
