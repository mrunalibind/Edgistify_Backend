let mongoose = require("mongoose");

let dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
let connection = mongoose.connect(process.env.URL);

module.exports = { connection };