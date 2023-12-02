const router = require("express").Router();
const { createCampaign } = require("../controllers/campaigns/createCampaign");
const { createTask } = require("../controllers/campaigns/createTask");
const { deleteTask } = require("../controllers/campaigns/deleteTask");
const { editTask } = require("../controllers/campaigns/editTask");
const { executeCampaign } = require("../controllers/campaigns/executeCampaign");
const {
  getByQuery,
  getMultipleByQuery,
} = require("../controllers/campaigns/getByQuery");
const { getAllCampaigns } = require("../controllers/campaigns/getCampaign");
const {
  initiateCampaign,
} = require("../controllers/campaigns/initiateCampaign");
const { inviteVolunteer } = require("../controllers/campaigns/inviteVolunteer");
const { invitesResponse } = require("../controllers/campaigns/invitesResponse");
const { makeLead, makeAutoLead } = require("../controllers/campaigns/makeLead");
const {
  addVolunteerToTeam,
  removeVolunteerFromTeam,
} = require("../controllers/campaigns/teams");
const { update } = require("../controllers/campaigns/update");
const { updateCampaign } = require("../controllers/campaigns/updateCampaign");
const { updatePoints } = require("../controllers/campaigns/updatePoints");
const verify = require("../middlewares/Auth");

router.post("/create", verify, createCampaign);
// router.get("/get", verify, getAllCampaigns);
router.get("/get-by-query", verify, getByQuery);
router.get("/get-multiple-by-query", verify, getMultipleByQuery);
router.patch("/invite-volunteer/:campaignId", verify, inviteVolunteer);
router.patch("/invite-response/:campaignId", verify, invitesResponse);
// router.patch("/add-volunteer/:campaignId", verify, addVolunteerToTeam);
// router.patch("/remove-volunteer/:campaignId", verify, removeVolunteerFromTeam);
// router.post("/add-task/:campaignId", verify, createTask);
// router.delete("/delete-task/:campaignId", verify, deleteTask);
// router.patch("/edit-task/:campaignId", verify, editTask);
// router.patch("/make-lead/:campaignId", verify, makeLead);
router.patch("/update-campaign/:campaignId", verify, updateCampaign);
// router.patch("/initiate-campaign/:groupId", verify, initiateCampaign);
// router.patch("/execute-campaign/:campaignId", verify, executeCampaign);
// router.patch("/auto-lead/:campaignId", verify, makeAutoLead);
// router.patch("/update-points/:campaignId", verify, updatePoints);
router.patch("/update/:campaignId", verify, update);

module.exports = router;
