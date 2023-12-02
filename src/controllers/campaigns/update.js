const CampaignModel = require("../../models/campaignsSchema");
exports.update = async (req, res) => {
  console.log(req?.body);
  if (!req.params.campaignId) {
    res.status(400).send("Invalid id");
  } else {
    try {
      const _id = req.params.campaignId;
      const updateddoday = await CampaignModel.findByIdAndUpdate(
        _id,
        req.body,
        {
          new: true,
        }
      );
      if (!updateddoday) {
        res.status(500).send("internal server error");
      } else {
        res.status(200).send(updateddoday);
      }
    } catch (e) {
      res.status(400).send("invalid update fields");
    }
  }
};
