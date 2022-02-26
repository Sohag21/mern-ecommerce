const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to MongoDB!"))
.catch((err)=>console.log(err));

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get('/', (req, res)=>{
    res.send("Welcome to Nodejs Backend!")
});
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

app.listen(process.env.PORT || 8800, ()=>{
    console.log("Backend Server is runnig on post:8800!");
});