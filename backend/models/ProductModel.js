const { DataTypes } = require("sequelize");
const sequelize = require("../Database/db");

const Products = sequelize.define(
  "Products",
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.BLOB,
      allownull: false,
    },
    productStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    productRatings: {
      type: DataTypes.REAL,
      allowNull: false,
    },
  },
  {
    tableName: "products_table",
    timestamps: true,
  }
);

module.exports = Products;
