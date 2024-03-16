const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const key = "jndskjnwkjniefhwbnfvhbef";

// Register a User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const userData = await User.findOne({
    email: email,
    password: password,
  });
  let token = null;
  if (userData != null) {
    //valid user

    token = jwt.sign(
      {
        data: userData._id,
      },
      key,
      { expiresIn: "1d" }
    );
    if (userData.approved === false) {
      res.status(401).json({
        error: "User not approved yet!",
      });
    } else {
      res.status(200).json({
        Token: token,
        Role: userData.role,
        firstName: userData.firstname,
      });
    }
  } else {
    res.status(404).json({
      error: "User not found!",
    });
  }

  //console.log(userData, token);
};

exports.registerUser = async (req, res) => {
  console.log("REGISTER USER");
  const {
    username,
    password,
    firstName,
    lastName,
    dob,
    gender,
    city,
    address,
    email,
    type,
  } = req.body;
  const newUser = new User({
    address: address,
    approved: false,
    birthdate: dob,
    city: city,
    email: email,
    firstname: firstName,
    gender: gender,
    lastname: lastName,
    password: password,
    role: type,
    username: username,
  });
  let token = null;
  try {
    const userData = await newUser.save();

    token = jwt.sign(
      {
        data: userData._id,
      },
      key,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "User Saved Successfully!",
      Token: token,
      Role: userData.role,
      firstName: userData.firstname,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      res.status(405).json({
        error: `${Object.keys(err.keyValue)[0]} already used!`,
      });
    } else {
      res.status(404).json({
        error: "Unknown error has occured!",
      });
    }
  }
};

// exports.editDetails = async (req, res) => {
//   const token = req.headers.Authorization;
//   const userID = jwt.verify(token, key);
// };
exports.editDetails = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (authorization != undefined) {
      try {
        console.log("USERNAME ", req.body.username);
        var decoded = jwt.verify(authorization, key);
        console.log("decoded \n");
        console.log(decoded);

        const {
          username,
          password,
          firstname,
          lastname,
          city,
          address,
          email,
        } = req.body;
        const user = await User.findById(decoded.data);

        if (!user) {
          res.status(401).json({
            error: "Error:User not found!",
          });
        } else {
          user.username = username;
          user.password = password;
          user.firstname = firstname;
          user.lastname = lastname;
          user.city = city;
          user.address = address;
          user.email = email;

          try {
            await user.save();
            // const newUser = await User.findById(user._id);
            // console.log("NEW ADD");
            // console.log(newUser.address);
            // const allUsers = await User.find({ approved: false });
            // console.log("ALL USERS");
            // console.log(allUsers);
            res.status(200).json({
              message: "User Updated Successfully!",
            });
          } catch (err) {
            console.log(err);
            if (err.code === 11000) {
              res.status(405).json({
                error: `${Object.keys(err.keyValue)[0]} already used!`,
              });
            } else {
              res.status(404).json({
                error:
                  "Error:User was not added successfully, username and email must be unique!",
              });
            }
          }
        }
      } catch (err) {
        console.log(err);
        res.status(401).json({
          error: "Error:User not found!",
        });
      }
    } else {
      res.status(401).json({
        error: "Error:User not found!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error:Internal Server Error",
    });
  }
};

exports.getDetails = async (req, res) => {
  const { authorization } = req.headers; //AAO
  if (authorization != undefined) {
    try {
      var decoded = jwt.verify(authorization, key);
      const user = await User.findById(decoded.data);
      if (!user) {
        res.status(401).json({
          error: "User not found!",
        });
      } else {
        console.log("ANA HENA USERRR");
        // console.log(user);
        res.status(200).json({
          user: user,
        });
        console.log("ANA HENA USERRR");
      }
    } catch (err) {
      console.log(err);
      res.status(401).json({
        error: "User not found!",
      });
    }
  } else {
    res.status(401).json({
      error: "User not found!",
    });
  }
};

exports.getRole = async (req, res) => {
  const { authorization } = req.headers;
  console.log("token1 ", authorization);
  if (authorization != undefined) {
    try {
      var decoded = jwt.verify(authorization, key);
      console.log("decoded \n");
      console.log(decoded);
      const user = await User.findById(decoded.data);

      if (!user || user.approved === false) {
        res.status(401).json({
          Role: "G",
        });
      } else {
        console.log("\n\n");
        console.log(user.role);
        // console.log(user);
        console.log("\n\n");
        res.status(200).json({
          Role: user.role,
        });
      }
    } catch (errr) {
      res.status(401).json({
        Role: "G",
      });
    }
  } else {
    res.status(401).json({
      Role: "G",
    });
  }
};
