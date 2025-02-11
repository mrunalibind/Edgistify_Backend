let jwt = require("jsonwebtoken");
const User = require("../models/user");

let authentication = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    
    try {
        jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
            if (decoded) {
                req.user = await User.findById(decoded.id);
                next();
            }
            else {
                res.status(500).send({ msg: err });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = authentication;