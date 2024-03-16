const app = require("./app");
// const cloudinary = require("cloudinary");

const ticket = require("./models/ticketModel");
const team = require("./models/teamModel");
const match = require("./models/matchModel");
const referee = require("./models/refreeModel");
const stadium = require("./models/stadiumModel");
const user = require("./models/userModel");

const { connectDatabase, closeDatabase } = require("./config/database");

app.listen(3001, () => {
  console.log("server is running");
  connectDatabase();
});
