const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: [true, "Please Enter Match"],
  },
  seat: {

    type: String,
    required: [true, "Please Enter Seat"],

  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please Enter User"],
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
