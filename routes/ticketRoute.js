const express = require("express");
const { getTickets, cancelTicket } = require("../controllers/ticketController");
// const { default: EditDetails } = require("../../client/src/pages/EditDetails");
// da mohem hahoto ka middleware lelhagat el hatehtag authentication
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/gettickets").get(getTickets);
router.route("/cancelticket").post(cancelTicket);

// router.route("/forgetpassword")

module.exports = router;
