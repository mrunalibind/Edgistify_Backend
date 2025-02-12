const Cart = require("../models/cart");
const Product = require("../models/product");

const getCartProduct = async (req, res) => {

    try {
        let products = await Cart.find({userID: req.user._id}).populate("productID"); 
        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        }); 
    }
};
const addProductToCart = async (req, res) => {
    let { productID, quantity, price } = req.body;

    try {
        if (!productID)
            return res.status(401).json({ msg: "productID and quantity are required" });
    
        let product = await Product.findById(productID);
        let productAvailability = await Cart.findOne({ productID });
        if (productAvailability) {
            return res.status(400).json({
                msg: "Product is already exist in cart"
            });
        }
        if (product.quantity < quantity) {
            return res.status(400).json({
                msg: `Only ${product.quantity} quantity available `
            });
        }
        let cart = new Cart({ productID, quantity, price, userID: req.user._id });
        await cart.save();
        
        res.status(200).json({
            msg: "Added to cart"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = { getCartProduct, addProductToCart };