const Product = require("../models/product");

const getProducts = async (req, res) => {
    try {
        let { page, perPage } = req.query;
        page = parseInt(page, 10) || 1;
        perPage = parseInt(perPage, 10) || 10;

        const options = {
            page,
            limit: perPage,
            sort: { createdAt: -1 },
        };

        const products = await Product.paginate({ }, options);
        
        res.status(200).json({
            products,   
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = getProducts;