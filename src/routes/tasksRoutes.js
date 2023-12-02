const router = require("express").Router();
const { getTaskByQuery } = require("../controllers/tasks/getTasksByQuery");
const verify = require("../middlewares/Auth");
router.get("/get-by-query", verify, getTaskByQuery);
module.exports = router;
