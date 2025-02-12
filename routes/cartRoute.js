let express = require("express");
const { addProductToCart, getCartProduct } = require("../controllers/cartController");
const authentication = require("../middleware/auth");

let cartRouter = express.Router();

cartRouter.route("/getCartProduct").get(authentication, getCartProduct);
cartRouter.route("/addProductToCart").post(authentication, addProductToCart);

module.exports = cartRouter;