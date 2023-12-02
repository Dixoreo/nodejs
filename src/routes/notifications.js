const router = require("express").Router();
const verify = require("../middlewares/Auth");
const addnotification = require("../controllers/notification/addnotification");
const getnoties = require("../controllers/notification/getnotifications");
const {
  notifyPostAuthor,
} = require("../controllers/notification/notifyPostAuthor");
const {
  addMultipleNotifications,
} = require("../controllers/notification/addMultipleNotifications");
const {
  changeNotificationType,
} = require("../controllers/notification/changeNotificationType");
router.post("/addnotification", verify, addnotification);
router.get("/getnoties", verify, getnoties);
router.post("/addMultipleNotifications", verify, addMultipleNotifications);

router.post("/commentNotification/:id", verify, notifyPostAuthor);
router.patch("/change-notification-type/:id", verify, changeNotificationType);
module.exports = router;
