const sequelize = require("../Database/db");
const Products = require("../models/ProductModel");

const CreateProducts = async (req, res) => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized");
    var products = [];
    products = req.body;
    products.map(async (item) => {
      const {
        productName,
        productDescription,
        productImage,
        productStock,
        productPrice,
        productRatings,
      } = item;
      await Products.create({
        productName,
        productDescription,
        productImage,
        productStock,
        productPrice,
        productRatings,
      });
    });
    res.status(201).json(products);
  } catch (error) {
    console.log("Error occured creation of product:", error);
    res.status(500).end();
  }
};

module.exports = CreateProducts;
