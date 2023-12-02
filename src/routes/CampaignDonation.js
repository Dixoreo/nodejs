const router = require("express").Router();
const donationController = require("../controllers/CampaignDonations/CampaignDonation");
router.post("/donations", donationController.createDonation);

router.get(
  "/donations/:campaignId",
  donationController.getDonationsByCampaignId
);

module.exports = router;
