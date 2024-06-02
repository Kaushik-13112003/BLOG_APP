const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const {
  createPostController,
  updatePostController,
  getSinglePostController,
  getAllPostController,
  deletePostController,
  getPostImagesController,
  getUsersAllPostController,
  searchPostController,
  similarPostController,
} = require("../controller/postController");
const auth = require("../middleare/auth");

//create post
router.post("/create-post", auth, formidable(), createPostController);

//update post
router.put("/update-post/:id", auth, formidable(), updatePostController);

//get single post
router.get("/single-post/:id", getSinglePostController);

//get alll post
router.get("/all-post", getAllPostController);

//get users alll post
router.get("/user-all-post/:id", getUsersAllPostController);

//delete post
router.delete("/delete-post/:id", auth, deletePostController);

//get images
router.get("/post-photo/:id", getPostImagesController);

//similiar posts
router.get("/similiar-post/:id", similarPostController);

//test
router.get("/test", auth, (req, res) => {
  if (req.user) {
    return res.status(200).json({ user: req.user });
  } else {
    return res.status(400).json({ message: "User is not Authorized" });
  }
});

//search post
router.get("/search/:keyword", searchPostController);
module.exports = router;
