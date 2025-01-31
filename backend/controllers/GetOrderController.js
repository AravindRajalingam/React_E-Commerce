const Orders = require("../models/OrderModel");

const GetOrders = async (req, res) => {
  var orders = [];
  try {
    const { userId } = req.params;
    orders = await Orders.findAll({
      where: { userId },
    });
    if (orders.length === 0) {
      res.status(404).json({ message: "Orders not found" });
    } else {
      res.status(200).json(orders);
    }
  } catch (error) {
    console.log("Error occured in Get orders: ", error);
    res.status(500).json({ message: "Error occured Get orders" });
  }
};

module.exports = GetOrders;
