const bucketsSchema = require("../../models/bucketsSchema");

exports.getBuckets = async (req, res, next) => {
  try {
    const buckets = await bucketsSchema.find();
    return res.status(200).json({ success: true, buckets });
  } catch (error) {
    console.log("error in create bucket is ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
