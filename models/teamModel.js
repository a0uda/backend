const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Team Name"],
    maxLength: [30, "Team Name cannot exceed 30 characters"],
    minLength: [3, "Team Name should have more than 3 characters"],
  },
  logo: {
    type: String,
    required: [true, "Please Enter Team Logo"],
  },
});

module.exports = mongoose.model("Team", teamSchema);
