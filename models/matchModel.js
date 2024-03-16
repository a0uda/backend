const mongoose = require("mongoose");

const matchSchema = mongoose.Schema({
  hometeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: [true, "Please Enter Home Team"],
  },
  awayteam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: [true, "Please Enter Away Team"],
  },
  stadium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stadium",
    required: [true, "Please Enter Stadium"],
  },
  date: {
    type: Date,
    required: [true, "Please Enter Match Date"],
    get: (date) => date.toLocaleDateString("en-US"),
  },
  time: {
    type: String,
    required: [true, "Please Enter Match Time"],
  },
  referee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Referee",
    required: [true, "Please Enter Referee"],
  },
  linesmen: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Referee",
      required: [true, "Please Enter Linesman 1"],
    },
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Referee",
      required: [true, "Please Enter Linesman 2"],
    },
  ],
  reservedseats: [
    {
      type: String,
      required: [false],
    },
  ],
  ticketprice: {
    type: Number,
    required: [true, "Please Enter Ticket Price"],
  },
});

module.exports = mongoose.model("Match", matchSchema);
