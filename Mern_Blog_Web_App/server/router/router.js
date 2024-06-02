const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const {
  registerController,
  loginController,
  getSingleUserController,
  getSingleUserImageController,
  updateUserController,
  deleteSingleUserController,
  updatePasswordController,
} = require("../controller/userController");
const auth = require("../middleare/auth");

router.post("/register", formidable(), registerController);

//register
router.post("/login", loginController);

//get single user
router.get("/single-user/:id", getSingleUserController);

//get photo
router.get("/user-photo/:id", getSingleUserImageController);

//update user
router.put("/update-user/:id", auth, formidable(), updateUserController);

//delete user
router.delete("/delete-user/:id", auth, deleteSingleUserController);

//forgot password
router.put("/update-password", auth, updatePasswordController);

router.get("/auth", auth, (req, res) => {
  if (req.user) {
    return res.status(200).json({ user: req.user });
  } else {
    return res.status(400).json({ message: "User is not Authorized" });
  }
});

module.exports = router;
