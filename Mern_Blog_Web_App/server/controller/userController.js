const userModel = require("../models/userModel");
const fs = require("fs");
const { hashPasswordFunc, normalPassword } = require("../helper/hashPassword");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    let { name, email, password } = req.fields;
    let { photo } = req.files;

    if (!name) {
      return res.status(400).json({ message: "please complete name field" });
    }
    if (!email) {
      return res.status(400).json({ message: "please complete email field" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "please complete password field" });
    }

    if (!photo) {
      return res.status(400).json({ message: "please upload photo" });
    }

    //isExist
    const isExist = await userModel.findOne({ email: email });

    if (isExist) {
      return res.status(400).json({ message: "E-Mail already Exists" });
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid E-Mail Format" });
      } else {
        password = await hashPasswordFunc(password);

        const newUser = new userModel({
          name,
          email,
          password,
        });

        if (photo) {
          newUser.photo.data = fs.readFileSync(photo.path);
          newUser.photo.contentType = photo.type;
        }

        await newUser.save();
        return res.status(200).json({ message: "User Regisered Successfully" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "please complete email field" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "please complete password field" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid E-Mail Format" });
    }
    //verify email & password
    const verify = await userModel.findOne({ email: email }).select("-photo");

    if (verify) {
      //decode password
      let isMatch = await normalPassword(password, verify.password);
      const token = await jwt.sign({ _id: verify._id }, process.env.TOKEN, {
        expiresIn: "7d",
      });

      if (isMatch) {
        return res.status(200).json({
          message: "Login Successfully",
          loginData: verify,
          token: token,
          role: verify.role,
        });
      } else {
        return res.status(400).json({ message: "Wrong Credentials" });
      }
    } else {
      return res.status(400).json({ message: "Wrong Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

//get single user
const getSingleUserController = async (req, res) => {
  try {
    let { id } = req.params;

    const findUser = await userModel.findById(id).select("-photo");

    if (findUser) {
      return res.status(200).json({ findUser: findUser });
    } else {
      return res.status(400).json({ message: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

//update user
const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    let { photo } = req.files;

    const updateUser = await userModel
      .findByIdAndUpdate({ _id: id }, { ...req.fields }, { new: true })
      .select("-photo");
    if (photo) {
      if (photo.size > 2 * 1024 * 1024) {
        return res.status(400).json({ message: "photo should be of < 2 MB " });
      } else {
        updateUser.photo.data = fs.readFileSync(photo.path);
        updateUser.photo.contentType = photo.type;
      }
    }

    await updateUser.save();
    return res
      .status(200)
      .json({ message: " Updated Successfully", loginData: updateUser });
  } catch (err) {
    console.log(err);
  }
};

//update user
const updatePasswordController = async (req, res) => {
  try {
    let { email, newPassword } = req.body;

    if (!email) {
      return res.status(400).json({ message: "please complete email field" });
    }
    if (!newPassword) {
      return res
        .status(400)
        .json({ message: "please complete password field" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid E-Mail Format" });
    }

    //isExist
    const isExist = await userModel.findOne({ email: email });

    if (isExist) {
      const updatePassword = await userModel.updateOne(
        { email: email },
        { $set: { password: await hashPasswordFunc(newPassword) } }
      );

      if (updatePassword) {
        return res.status(200).json({ message: "Password Updated " });
      }
    } else {
      return res.status(400).json({ message: "E-Mail not Exists" });
    }
  } catch (err) {
    console.log(err);
  }
};

//delete user
const deleteSingleUserController = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteUser = await userModel.findByIdAndDelete({ _id: id });

    await deleteUser.save();
    return res.status(200).json({ message: " Deleted Successfully" });
  } catch (err) {
    console.log(err);
  }
};

//get image
const getSingleUserImageController = async (req, res) => {
  try {
    let { id } = req.params;

    let findPhoto = await userModel.findOne({ _id: id }).select("photo");

    if (findPhoto.photo.data) {
      return res.status(200).send(findPhoto.photo.data);
    } else {
      return res.status(400).json({ message: "Photo Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerController,
  loginController,
  deleteSingleUserController,
  updateUserController,
  getSingleUserController,
  getSingleUserImageController,
  updatePasswordController,
};
