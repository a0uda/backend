const express = require("express");
const {
  getUnapprovedUsers,
  insertUsers,
  deleteUser,
  getAllUsers,
} = require("../controllers/adminController");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/getUnapprovedUsers").get(getUnapprovedUsers);

router.route("/insertUsers").post(insertUsers);

router.route("/deleteUser").post(deleteUser);

router.route("/getAllUsers").get(getAllUsers);

module.exports = router;
