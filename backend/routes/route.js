const express = require("express");
const CreateUser = require("../controllers/UsersController");
const CreateOrder = require("../controllers/OrdersController");
const GetAllProducts = require("../controllers/ProductsController");
const CreateProducts = require("../controllers/CreateProductsController");
const GetSingleProduct = require("../controllers/SingleProductController");
const ValidateUser = require("../controllers/LoginController");
const Getuser = require("../controllers/GetUserController");
const GetOrders = require("../controllers/GetOrderController");
const router = express.Router();

router.route("/").get(GetAllProducts);
router.route("/productcreation").post(CreateProducts);
router.route("/product/:productId").get(GetSingleProduct);
router.route("/order").post(CreateOrder);
router.route("/usercreation").post(CreateUser);
router.route("/getuser").post(Getuser);
router.route("/login").post(ValidateUser);
router.route("/getorders/:userId").get(GetOrders);

module.exports = router;
