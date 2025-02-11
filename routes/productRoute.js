let express = require("express");
const authentication = require("../middleware/auth");
const getProducts = require("../controllers/productController");

let productRouter = express.Router();

productRouter.route("/getProducts").get(authentication, getProducts);

module.exports = productRouter;