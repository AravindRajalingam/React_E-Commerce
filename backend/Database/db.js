const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "config", "db.env") });

const sequelize = new Sequelize("ecommerce_db", "root", "aravind@2004", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(console.log("Database Connected successfully!!"))
  .catch((err) => console.log("Error occured :", err));

module.exports = sequelize;
