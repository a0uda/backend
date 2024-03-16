const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Match = require("../models/matchModel");
// Getting all pending requests
exports.getUnapprovedUsers = async (req, res) => {
  try {
    // console.log('Hi');
    //const { username, firstname, lastname, email, role } = req.body;
    const unapprovedUsers = await User.find({ approved: false });
    // console.log(unapprovedUsers);
    res.status(200).json({ unapprovedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Inserting users into the database
exports.insertUsers = async (req, res) => {
  try {
    const { username } = req.body;

    const insertUsers = await User.findOneAndUpdate(
      { username: username },
      { $set: { approved: true } },
      { new: true }
    );
    console.log("Done ya regoola:", insertUsers.username);
    res
      .status(200)
      .json({ message: "User approved successfully", user: insertUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Deleting users from the database
exports.deleteUser = async (req, res) => {
  try {
    console.log("Hi");

    const { username } = req.body;

    const getuserid = await User.findOne({ username: username });
    console.log("Gebt el id", getuserid.id);

    const ticketsid = await Ticket.find({ user: getuserid.id });
    console.log("Gebt el tickets", ticketsid);

    for (let i = 0; i < ticketsid.length; i++) {
      console.log("AWIL EL FOR");
      const matchesid = await Match.findOne({ _id: ticketsid[i].match });
      console.log("matches id", matchesid);
      console.log("tickets id", ticketsid[i].seat);
      matchesid.reservedseats = matchesid.reservedseats.filter(
        (item) => item !== ticketsid[i].seat
      );
      await matchesid.save();
    }

    const deleteUser = await User.findOneAndDelete({ username: username });
    console.log("Salam ya sahby:", deleteUser.username);
    // console.log('Gebt el match', matchesid);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Getting all users
exports.getAllUsers = async (req, res) => {
  try {
    console.log("Hi");
    // const { username, firstname, lastname, email, role } = req.body;

    const getAllUsers = await User.find({ approved: true, role: { $ne: "A" } });

    res.status(200).json(getAllUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.registerUser = async (req, res) => {
//   const {
//     username,
//     password,
//     firstName,
//     lastName,
//     dob,
//     gender,
//     city,
//     address,
//     email,
//     type,
//   } = req.body;
//   const newUser = new User({
//     address: address,
//     approved: false,
//     birthdate: dob,
//     city: city,
//     email: email,
//     firstname: firstName,
//     gender: gender,
//     lastname: lastName,
//     password: password,
//     role: type,
//     username: username,
//   });
//   let token = null;
//   try {
//     const userData = await newUser.save();

//     token = jwt.sign(
//       {
//         data: userData._id,
//       },
//       key,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({
//       message: "User Saved Successfully!",
//       Token: token,
//       Role: userData.role,
//     });
//   } catch (err) {
//     console.log(err);
//     if (err.code === 11000) {
//       res.status(405).json({
//         error: `${Object.keys(err.keyValue)[0]} already used!`,
//       });
//     } else {
//       res.status(404).json({
//         err,
//       });
//     }
//   }
// };

// // exports.editDetails = async (req, res) => {
// //   const token = req.headers.Authorization;
// //   const userID = jwt.verify(token, key);
// // };
// exports.editDetails = async (req, res) => {
//   const a = req.body;
// };
// exports.getDetails = async (req, res) => {
//   const userID = req.body;
// };

// exports.getRole = async (req, res) => {
//   const {authorization} = req.headers;
//   console.log("token1 " , authorization);
//   if (authorization != undefined) {
//     var decoded = jwt.verify(authorization, key);
//     console.log("decoded \n");
//     console.log(decoded);
//   //   // console.log(token);

//     const user = await User.findById(decoded.data);

//     if (!user) {
//       res.status(401).json({
//         Role: "G",
//       });
//     } else {
//       console.log("\n\n");
//       console.log(user.role);
//       // console.log(user);
//       console.log("\n\n");
//       res.status(200).json({
//         Role: user.role,
//       });
//     }
//   } else {
//     res.status(401).json({
//       Role: "G",
//     });
//   }
// };
