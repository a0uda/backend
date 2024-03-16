const mongoose = require("mongoose");
const validator = require("validator");

// const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please Enter Your username"],
    maxLength: [30, "Username cannot exceed 30 characters"],
    minLength: [3, "Username should have more than 3 characters"],
  },
  password: {
    type: String,
    required: [true, "Error:Please Enter Your Password"],
    minLength: [8, "Error:Password should be greater than 8 characters"],
    // select: false, AAO
  },
  firstname: {
    type: String,
    required: [true, "Error:Please Enter Your First Name"],
    maxLength: [30, "Error:First Name cannot exceed 30 characters"],
    minLength: [3, "Error:First Name should have more than 3 characters"],
  },
  lastname: {
    type: String,
    required: [true, "Error:Please Enter Your Last Name"],
    maxLength: [30, "Error:Last Name cannot exceed 30 characters"],
    minLength: [3, "Error:Last Name should have more than 3 characters"],
  },
  birthdate: {
    type: Date,
    required: [true, "Error:Please Enter Your Birthdate"],
    get: (date) => date.toLocaleDateString("en-US"), //AAO
  },
  gender: {
    type: String,
    required: [true, "Error:Please Enter Your Gender"],
    enum: ["M", "F"],
  },
  city: {
    type: String,
    required: [true, "Error:Please Enter Your City"],
    maxLength: [30, "Error:City cannot exceed 30 characters"],
    minLength: [3, "Error:City should have more than 3 characters"],
  },
  address: {
    type: String,
    required: [false],
  },
  email: {
    type: String,
    required: [true, "Error:Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Error:Please Enter a valid Email"],
  },
  role: {
    type: String,
    required: [true, "Error:Please Enter Your Role"],
    enum: ["M", "F", "A"],
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
