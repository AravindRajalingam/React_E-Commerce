const Users = require("../models/UserModel");

const ValidateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: { email: email, password: password },
    });
    if (user !== null) {
      console.log("User found : ", email);
      res.status(200).json({ message: "User found" });
    } else {
      console.log("User not found :", email);
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Database Synchronization error" });
  }
};

module.exports = ValidateUser;
