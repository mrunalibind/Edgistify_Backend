let express = require("express");
let cors = require("cors");
let app = express();
app.use(cors({
    origin: 'https://edgistify-frontend.onrender.com',
    credentials: true,
}));
app.use(express.json());
let dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
const { connection } = require("./config/database");
const productRouter = require("./routes/productRoute");
dotenv.config({ path: './config/config.env' });

app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Working Properly"
    });
});

app.listen(process.env.PORT, async() => {
    try {
        await connection;
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running on port", process.env.PORT);
});

// https://edgistify-backend-oh53.onrender.com/
// https://edgistify-frontend.onrender.com/