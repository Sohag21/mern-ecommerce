const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//register
router.post("/register", async(req, res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//login
router.post("/login", async(req, res)=>{
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong credentials!");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const validatedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        validatedPassword !== req.body.password && res.status(401).json("Wrong credentials!");

        const {password, ...others } = user._doc;

        res.status(200).json(others);
    } catch (error) {
        return res.status(500).json(error);
    }
});
 
module.exports = router;