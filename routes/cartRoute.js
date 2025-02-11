let express = require("express");
const { addProductToCart } = require("../controllers/cartController");
const authentication = require("../middleware/auth");

let cartRouter = express.Router();

cartRouter.route("/addProductToCart").post(authentication, addProductToCart);

module.exports = cartRouter;