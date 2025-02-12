let mongoose = require("mongoose");
let orderSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productID: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered"],
        default: "Pending",
    },
}, { timestamps: true });
let Order = mongoose.model("Order", orderSchema);

orderSchema.index({ userID: 1 }, (err) => {
    if (err) {
      console.error("Error creating index:", err.message);
    }
});

module.exports = Order;