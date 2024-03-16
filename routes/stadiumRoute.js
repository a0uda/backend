const express = require("express");
const { addstadium } = require("../controllers/stadiumController");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
router.route("/addstadium").post(addstadium);

module.exports = router;
