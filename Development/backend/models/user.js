const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username cannot be blank"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank"],
  },
  name: {
    type: String,
    required: [true, "Name cannot be blank"],
  },
  email: {
    type: String,
    required: [true, "Email cannot be blank"],
    unique: true,
  },
  age: {
    type: Number,
    required: [true, "Age cannot be blank"],
  },
  institute: { type: String },
});

module.exports = mongoose.model("User", userSchema);
