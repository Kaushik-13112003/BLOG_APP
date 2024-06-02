const mongoose = require("mongoose");

// Create OTP schema and model
const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const otpModel = mongoose.model("OTP", otpSchema);
module.exports = otpModel;
