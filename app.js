const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const user = require("./routes/userRoute");
app.use("/api/user", user);

const match = require("./routes/matchRoute");
app.use("/api/match", match);

const stadium = require("./routes/stadiumRoute");
app.use("/api/stadium", stadium);
const admin = require("./routes/adminRoute");
app.use("/api/admin", admin);

const ticket = require("./routes/ticketRoute");
app.use("/api/ticket", ticket);

app.use(errorMiddleware);

module.exports = app;
