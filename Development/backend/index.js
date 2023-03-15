require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const indexRoutes = require("./routes/index");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const authRoutes = require("./routes/auth");

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));

const sessionObject = {
  secret: process.env.SECRET_KEY,
};

//Middlewares
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use(session(sessionObject));

app.use(indexRoutes);
app.use("/", authRoutes);

app.listen(80, () => {
  console.log("The server is listening on PORT", 80);
});

module.exports = app;
