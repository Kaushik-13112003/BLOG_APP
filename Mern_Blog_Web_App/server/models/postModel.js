const mongoose = require("mongoose");

const schemaDesign = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },

    des: {
      type: String,
      require: true,
    },

    author: {
      type: mongoose.ObjectId,
      ref: "userData",
    },

    category: {
      type: String,
      require: true,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },

    extra: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = new mongoose.model("postData", schemaDesign);
module.exports = postModel;
