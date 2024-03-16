const express = require("express");
const {
  viewMatches,
  viewReferee,
  viewStadium,
  creatematch,
  viewTeam,
  editMatch,
  getMatch,
  getMatchMid,

  reserveTickets,
} = require("../controllers/matchController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/viewMatches").get(viewMatches);
router.route("/getmatchmid/:matchId").get(getMatchMid); //de bt3ml auth
router.route("/reservetickets/:matchId").post(reserveTickets);

router.route("/viewReferee").get(viewReferee);
router.route("/viewTeam").get(viewTeam);
router.route("/viewStadium").get(viewStadium);
router.route("/creatematch").post(creatematch);
router.route("/editMatch/:matchID").post(editMatch);
router.route("/getMatch/:matchID").get(getMatch);
module.exports = router;
