const sequelize = require("../Database/db");
const Products = require("../models/ProductModel");

const GetAllProducts = async (req, res) => {
  try {
    var products = [];
    products = await Products.findAll();
    const modproducts = products.map((product) => {
      const base64Image = product.productImage
        ? Buffer.from(product.productImage).toString("base64")
        : null;
      return {
        productId: product.productId,
        productName: product.productName,
        productDescription: product.productDescription,
        productImage: base64Image
          ? `data:image/jpeg;base64,${base64Image}`
          : null,
        productPrice: product.productPrice,
        productRatings: product.productRatings,
      };
    });
    res.status(200).json(modproducts);
  } catch (error) {
    console.log("Error during get all products : ", error);
    res.status(500).end();
  }
};

module.exports = GetAllProducts;
