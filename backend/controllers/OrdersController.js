const { DATEONLY } = require("sequelize");
const sequelize = require("../Database/db");
const Orders = require("../models/OrderModel");
const Products = require("../models/ProductModel");
const Users = require("../models/UserModel");

const CreateOrder = async (req, res) => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database Syncronized");
    const { userId, productId, quantity } = req.body;
    const user = await Users.findByPk(userId);
    if (user !== null) {
      try {
        var { productName, productPrice, productStock } =
          await Products.findByPk(productId);
        if (productStock > 0) {
          const updatedStock = productStock - quantity;
          const [affectedrow] = await Products.update(
            {
              productStock: updatedStock,
            },
            {
              where: { productId: productId },
            }
          );
          if (affectedrow > 0) {
            console.log("Stock updation executed successfully!!");
          }
          const amount = Number((quantity * productPrice).toFixed(2));
          const order = await Orders.create({
            userId,
            productId,
            productName,
            quantity,
            amount,
          });
          res.status(201).json(order);
        } else {
          res
            .status(404)
            .json({ message: "No stocks for the ordered product" });
        }
      } catch (error) {
        console.log("No products found for given product ID");
        res
          .status(404)
          .json({ message: "No products found for given product ID" });
      }
    } else {
      console.log("You need to register in the application");
      res.status(404).json({
        message: "No users found and You need to register in the application",
      });
    }
  } catch (error) {
    console.log("Order creation error:", error);
    res.status(500).end();
  }
};

module.exports = CreateOrder;
