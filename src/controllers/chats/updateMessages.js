const model = require("../../models/groups");
const updategroup = async (req, res) => {
  res.send({ path: req.file.filename, status: 200 });
};

module.exports = updategroup;
