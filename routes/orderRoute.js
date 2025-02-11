let express = require("express");
const { placeOrder } = require("../controllers/orderController");
const authentication = require("../middleware/auth");

let orderRouter = express.Router();

orderRouter.route("/placeOrder").post(authentication, placeOrder);

module.exports = orderRouter;