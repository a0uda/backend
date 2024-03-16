const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const key = "jndskjnwkjniefhwbnfvhbef";

exports.isAuthenticatedUser = async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(req.headers, "authhhh");

  // const {token} = req.cookie
  if (authorization != undefined) {
    try {

      var decoded = jwt.verify(authorization, key);

      const user = await User.findById(decoded.data);
      if (!user) {
        throw new Error("Unauthorized User!");
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  } else {
    const err = new Error("Unauthorized User!");
    err.status = 401;
    next(err);
  }

  // console.log(decoded.foo) // bar
};
