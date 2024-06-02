const express = require("express");
const {
  sendOtpController,
  resetPasswordController,
} = require("../controller/otpController");
const router = express.Router();

router.post("/forgot-password", sendOtpController);

router.post("/reset-password", resetPasswordController);
module.exports = router;
