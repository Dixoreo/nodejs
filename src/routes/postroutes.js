const router = require("express").Router();
const addpost = require("../controllers/posts/addPost");
const multer = require("multer");
const verify = require("../middlewares/Auth");
const storage = require("../middlewares/ImageUploader/ImageUploader");
const updatepost = require("../controllers/posts/updatePost");
const upload = require("../middlewares/ImageUploader/ImageUploader");
const { getPosts, postsExperiment } = require("../controllers/posts/GetPosts");
const {  getUserPosts } = require("../controllers/posts/getMyPosts");
const getPost = require("../controllers/posts/GetPost");

router.post("/addpost", verify, upload.single("media"), addpost);
router.get("/getposts", verify, getPosts);
router.get("/posts-pagination", verify, postsExperiment);
router.post("/getPost", verify, getPost);

router.get("/get-user-posts/:phoneNumber", verify, getUserPosts);

router.patch("/updateposts/:id", verify, updatepost);
module.exports = router;
