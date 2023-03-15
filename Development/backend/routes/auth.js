const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  const { username, name, email, age, institute, password, confirmedPassword } =
    req.body;
  if (password != confirmedPassword) {
    res.redirect("/register");
  }
  const hashPw = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hashPw,
    name,
    email,
    age,
    institute,
  });
  await user.save();
  req.session.user_id = user._id;
  res.redirect("/");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  const { username_email, password } = req.body;
  const foundUsername = await User.findOne({ username: username_email });
  const foundUseremail = await User.findOne({ email: username_email });
  const foundUser = foundUsername || foundUseremail;
  const isValid = await bcrypt.compare(password, foundUser.password);
  if (!isValid) {
    res.send("FAILED TO LOGIN!!");
  }
  res.redirect("/");
});

router.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/login');
})

module.exports = router;
