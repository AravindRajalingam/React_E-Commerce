const Products = require("../models/ProductModel");

const GetSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Products.findByPk(productId);
    const base64Image = product.productImage
      ? Buffer.from(product.productImage).toString("base64")
      : null;
    product.productImage = base64Image
      ? `data:image/jpeg;base64,${base64Image}`
      : null;
    res.status(200).json(product);
  } catch (error) {
    console.log("Error occured during select a single product: ", error);
    res.status(500).end();
  }
};

module.exports = GetSingleProduct;
