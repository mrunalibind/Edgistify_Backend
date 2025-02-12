let mongoose = require("mongoose");
let cartSchema = mongoose.Schema({
    productID: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });
let Cart = mongoose.model("Cart", cartSchema);

cartSchema.index({ userID: 1 }, (err) => {
    if (err) {
      console.error("Error creating index:", err.message);
    }
});
module.exports = Cart;