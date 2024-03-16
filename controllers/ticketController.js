const Match = require("../models/matchModel");
const Referee = require("../models/refreeModel");
const Stadium = require("../models/stadiumModel");
const Team = require("../models/teamModel");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const jwt = require("jsonwebtoken");
const key = "jndskjnwkjniefhwbnfvhbef";

exports.getTickets = async (req, res) => {
  const { authorization } = req.headers;

  try {
    var decoded = jwt.verify(authorization, key);
    console.log("decoded \n");
    // console.log(decoded);

    //   // console.log(token);
    const tickets = await Ticket.find({ user: decoded.data });
    // console.log(tickets)
    let output = [];
    for (let i = 0; i < tickets.length; i++) {
      const matchId = tickets[i].match;
      const match = await Match.findById(matchId);
      const mainRef = await Referee.findById(match.referee);
      const sideRef1 = await Referee.findById(match.linesmen[0]);
      const sideRef2 = await Referee.findById(match.linesmen[1]);
      const stad = await Stadium.findById(match.stadium);
      const homeTeam = await Team.findById(match.hometeam);
      const awayTeam = await Team.findById(match.awayteam);
      // console.log(match)
      const obj = {
        seat: tickets[i].seat,
        ticketId: tickets[i]._id,
        match: {
          homeTeam: homeTeam.name,
          homeTeamLogo: homeTeam.logo,
          awayTeam: awayTeam.name,
          awayTeamLogo: awayTeam.logo,
          stadium: stad.name,
          date: match.date,
          Time: match.time,
          mainReferee: mainRef.name,
          linesman1: sideRef1.name,
          linesman2: sideRef2.name,
          // reservedSeats: match.reservedseats,
          ticketPrice: match.ticketprice,
          // rows:stad.seatsrowcapcity,
          // cols: stad.seatscolcapcity
        },
      };
      output.push(obj);
    }
    // console.log(output)
    res.status(200).json({
      output,
    });
  } catch (errr) {
    res.status(401).json({
      error: "Error in retrieving tickets!",
    });
  }
};

exports.cancelTicket = async (req, res) => {
  // Array.
  try {
    const ticketId = req.body.ticketId;
    console.log("ticketId", ticketId);

    const tick = await Ticket.findById(ticketId);
    console.log("tick", tick);

    const match = await Match.findById(tick.match);
    console.log("match", match);

    // const seats = match.reservedseats.
    const upSeats = match.reservedseats.filter((item) => item !== tick.seat);
    console.log("upSeats", upSeats);

    const updatingSeats = await Match.updateOne(
      { _id: match._id },
      { reservedseats: upSeats }
    );
    console.log("updatingSeats", updatingSeats);

    const deletion = await Ticket.deleteOne({ _id: ticketId });
    console.log("deletion", deletion);

    res.status(200).json({
      message: "Ticket Deleted Successfully!",
    });
  } catch (err) {
    res.status(404).json({
      error: "An unexpected Error occured in deletion!",
    });
  }
};
