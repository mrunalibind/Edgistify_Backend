let User = require("../models/user");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

const register = async (req, res) => {
    let { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password)
            return res.status(401).json({ msg: "full Name, Email and Password are required" });

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                msg: "User is already exist"
            });
        }
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                return res.status(401).json({
                    msg: err
                });
            }
            let user = new User({ fullName, email, password: hash });
            await user.save();
            res.status(200).json({
                msg: "Register Successfull"
            });
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    let { email, password } = req.body;
    try {
        if (!email || !password)
            return res.status(401).json({ msg: "Email and Password are required" });

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                msg: "User is not exist"
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            msg: "Login successful",
            token
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = { register, login };