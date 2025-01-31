const { DataTypes } = require("sequelize");
const sequelize = require("../Database/db");

const Orders = sequelize.define(
  "Orders",
  {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    expected_delivery: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true,
      },
    },
  },
  {
    tableName: "orders_table",
    timestamps: true,
  }
);

module.exports = Orders;
