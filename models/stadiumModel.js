const mongoose = require("mongoose");

const stadiumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Stadium Name"],
    maxLength: [30, "Stadium Name cannot exceed 30 characters"],
    minLength: [3, "Stadium Name should have more than 3 characters"],
    unique: true, //AAO
  },
  seatsrowcapcity: {
    type: Number,
    required: [true, "Please Enter Seats Row Capacity"],
    min: [1, "Seats Row Capacity should be greater than 0"],
  },
  seatscolcapcity: {
    type: Number,
    required: [true, "Please Enter Seats Column Capacity"],
    min: [1, "Seats Column Capacity should be greater than 0"],
  },
});

module.exports = mongoose.model("Stadium", stadiumSchema);
