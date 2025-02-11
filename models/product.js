let mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate-v2");

let productSchema = mongoose.Schema({
    image: {
        type: String,
    },
    type: {
        type: String,
    },
    pattern: {
        type: String,
    },
    title: {
        type: String,
    },
    rupees: {
        type: Number,
    },
    color: {
        type: String,
    },
    quantity: {
        type: Number,
    }
}, { timestamps: true });

productSchema.plugin(mongoosePaginate);

let Product = mongoose.model("product", productSchema);
module.exports = Product;