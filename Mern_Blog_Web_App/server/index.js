const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const colors = require("colors");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const morgan = require("morgan");

//middleare
app.use(express.json());
app.use(
  cors({
    origin: "https://blog-app-1-81ed.onrender.com", // Replace with your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(require("./router/router"));
app.use(require("./router/otpRoutes"));
app.use(require("./router/postRoute"));

//db & routes
require("./db/db");
app.listen(port, () => {
  console.log("App is Listning on Port : " + colors.random(port));
});
