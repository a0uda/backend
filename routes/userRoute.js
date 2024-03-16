const express = require("express");
const {
  loginUser,
  registerUser,
  editDetails,
  getDetails,
  getRole,
} = require("../controllers/userController");
// const { default: EditDetails } = require("../../client/src/pages/EditDetails");
// da mohem hahoto ka middleware lelhagat el hatehtag authentication
// const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/editDetails").post(editDetails);

router.route("/getDetails").get(getDetails);

router.route("/getRole").get(getRole);

// router.route("/forgetpassword")

module.exports = router;
