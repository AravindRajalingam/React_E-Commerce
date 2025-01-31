const Users = require("../models/UserModel");

const Getuser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({
      where: { email: email },
    });
    if (user !== null) {
      res.status(200).json({
        status: "success",
        message: "Data retrieved successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        status: "Failure",
        message: "No user for the given email id",
      });
    }
  } catch (error) {
    console.log("User Retrieve error:", error);
    res.status(500).end();
  }
};

module.exports = Getuser;
