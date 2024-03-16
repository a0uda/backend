const Stadium = require("../models/stadiumModel");
// const jwt = require('jsonwebtoken')
// const key = "jndskjnwkjniefhwbnfvhbef"

exports.addstadium = async (req, res) => {
  const { StadName, StadRows, StadSeats } = req.body;
  const newStadium = new Stadium({
    name: StadName,
    seatsrowcapcity: StadRows,
    seatscolcapcity: StadSeats,
  });
  const findstad = await Stadium.findOne({
    name: { $regex: new RegExp(StadName, 'i') },
  });
  if (!findstad) {
    try {
      const stadiumdata = await newStadium.save();
      res.status(200).json({
        message: "Stadium Saved Successfully!",
      });
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        res.status(405).json({
          error: `${Object.keys(err.keyValue)[0]} already used!`,
        });
      } else {
        res.status(404).json({
          err,
        });
      }
    }
  } else {
    res.status(405).json({
      error: `Error:Stadium with the same name already exists!`,
    });
  }
};
