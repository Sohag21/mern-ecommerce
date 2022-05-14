const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const productRoute = require("./routes/products")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/orders") 

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to MongoDB!"))
.catch((err)=>console.log(err));

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res)=>{
    res.send("Welcome to Nodejs Backend!")
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 8000, ()=>{
    console.log("Backend Server is runnig on post:8000!");
});