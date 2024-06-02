const mongoose = require("mongoose");
const DB = process.env.DB;

const connectDB = async () => {
  try {
    await mongoose.connect(DB);

    console.log("Database Connected");
  } catch (err) {
    console.log("Database not Connected");
    console.log(err);
  }
};

connectDB();
