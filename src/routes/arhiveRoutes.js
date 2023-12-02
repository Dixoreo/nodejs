const router = require("express").Router();
const verify = require("../middlewares/Auth");
const { addArchivePost } = require("../controllers/archivee/addArchivePost");
const { getArchivePosts } = require("../controllers/archivee/getArchivePosts");
const { undoArchive } = require("../controllers/archivee/undoArchive");
const { disbandGroup } = require("../controllers/archivee/disbandGroup");
const {
  getDisbandedGroups,
} = require("../controllers/archivee/getDisbandedGroups");
const { undoDisband } = require("../controllers/archivee/undoDisband");
const {
  addArchiveCamapaign,
} = require("../controllers/archivee/addArchiveCampaign");

router.post("/addPostArchive/:id", verify, addArchivePost); //id is of some document from posts collection
// router.get("/getArchivePosts", verify, getArchivePosts); //will fetch archive posts of LOGGED IN USER
// router.post("/undoArchive/:id", verify, undoArchive); //id is of some document from archives collection
// router.post("/disband-group/:id", verify, disbandGroup); // id is of some group from groups collection
// router.get("/get-disbanded-groups", verify, getDisbandedGroups); //will fetch us all the disbaned groups by the logged in user
// router.post("/undo-disband/:id", verify, undoDisband); // id is of some group from archives collection
router.patch("/addArchiveCampaign/:id", verify, addArchiveCamapaign);

module.exports = router;
