const mongoose = require("mongoose");

const refereeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Referee Name"],
    maxLength: [40, "Referee Name cannot exceed 40 characters"],
    minLength: [3, "Referee Name should have more than 3 characters"],
  },
});

module.exports = mongoose.model("Referee", refereeSchema);
