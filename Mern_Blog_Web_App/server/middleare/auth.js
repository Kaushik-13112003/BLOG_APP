const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const verify = await jwt.verify(
      req.headers.authorization,
      process.env.TOKEN
    );

    if (verify) {
      req.user = verify;
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = auth;
