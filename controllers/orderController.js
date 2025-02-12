const Cart = require("../models/cart");
const Order = require("../models/order");
const Product = require("../models/product");

const placeOrder = async (req, res) => {
    let { items, shippingAddress } = req.body;
    try {
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order must contain at least one item." });
        }
        if (!shippingAddress) return res.status(400).json({ message: "shippingAddress are required" });

        let totalPrice = 0;
        for (const item of items) {
            const product = await Product.findById(item.productID);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productID} not found.` });
            }
            totalPrice += product.rupees * item.quantity;
        }
        console.log(totalPrice);
        

        const productIds = items.map(item => item.productID);
        const products = await Product.find({ _id: { $in: productIds } });

        // Create a map of product availability
        const productStockMap = {};
        products.forEach(product => {
            productStockMap[product._id] = product.quantity;
        });
        console.log(productStockMap);

        // Validate stock
        for (const item of items) {
            console.log("product quantity validate")
            if (productStockMap[item.productID] < item.quantity) {
                console.log(productStockMap[item.productID], item.quantity)
                return res.status(400).json({ 
                    message: `Product ${item.productID} is out of stock or insufficient quantity available.` 
                });
            }
        }

        // Update product stock after successful order
        for (const item of items) {
            await Product.updateOne(
            { _id: item.productID },
            { $inc: { quantity: -item.quantity } }
            );
        }
  
        let order = new Order({ userID: req.user._id, items, totalPrice, shippingAddress });
        await order.save();
        await Cart.deleteMany({ userID: req.user._id });

        res.status(200).json({
            msg: "Order Created Successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
module.exports = { placeOrder };