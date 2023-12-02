const CampaignsDonation = require("../../models/campaignDonation");

// Controller function to create a donation
const createDonation = async (req, res) => {
  console.log(req.body);
  try {
    const {
      accountTitle,
      accountNumber,
      amount,
      bankAccount,
      campaignId,
      donatedBy,
    } = req.body;

    const newDonation = new CampaignsDonation({
      accountTitle,
      accountNumber,
      amount,
      bankAccount,
      campaignId,
      donatedBy,
    });

    const donation = await newDonation.save();

    res.status(201).json({ donation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get donations by campaignId
const getDonationsByCampaignId = async (req, res) => {
  try {
    const { campaignId } = req.params;

    const donations = await CampaignsDonation.find({ campaignId })
      .populate({
        path: "donatedBy",
        select: "profile fullName phoneNumber type",
        model: "NewUsers",
      })
      .populate({
        path: "campaignId",
        select: "campaignName",
        model: "Campaigns",
      });

    res.status(200).json({ donations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createDonation, getDonationsByCampaignId };
