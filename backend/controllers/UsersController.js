const sequelize = require("../Database/db");
const Users = require("../models/UserModel");

const CreateUser = async (req, res) => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database syncronized");
    const { username, email, password } = req.body;
    const user = await Users.create({
      username,
      email,
      password,
    });
    res.status(200).json({
      status: "success",
      message: "Data stored successfully",
      data: user,
    });
  } catch (err) {
    console.log("User creation error:", err);
    res.status(500).end();
  }
};

module.exports = CreateUser;
