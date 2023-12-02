const router = require("express").Router();
const login = require("../controllers/user/Login");
const getusers = require("../controllers/user/getusers");
const signup = require("../controllers/user/signup");
const verify = require("../middlewares/Auth");
const OTPGen = require("../controllers/user/OTPGen");
const upload = require("../middlewares/ImageUploader/ImageUploader");
const updateuser = require("../controllers/user/updateuser");
const {
  updateExpoPushToken,
} = require("../controllers/user/updateExpoPushToken");
const {
  followUnfollowUser,
} = require("../controllers/user/followUnfollowUser");
const {
  blockUser,
  unblockUser,
  getBlockedUsers,
} = require("../controllers/user/blockUnblock");
const { newChatContacts } = require("../controllers/user/newChatContacts");
const { getUserByPhone } = require("../controllers/user/getUserByPhone");
const { awardPoints } = require("../controllers/user/awardPoints");
const { getUserByQuery } = require("../controllers/user/getByQuery");

router.post("/login", login);
router.post("/register", upload.single("profile"), signup);
router.get("/getusers", verify, getusers);
// router.post("/otp", OTPGen);
// router.put("/updateUserExpoToken", verify, updateExpoPushToken);
router.patch("/updateUser/:id", upload.single("profile"), updateuser);
router.patch("/toggleFollow/:id", verify, followUnfollowUser);
router.patch("/block-user/:id", verify, blockUser);
router.patch("/unblock-user/:id", verify, unblockUser);
router.get("/new-chat-contacts", verify, newChatContacts);
router.get("/get-user/:phoneNumber", verify, getUserByPhone);
router.get("/get-blockedUsers", verify, getBlockedUsers);
// router.post("/award-points", verify, awardPoints);
// router.get("/get-by-query", verify, getUserByQuery);
module.exports = router;
