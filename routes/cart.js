const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const router = require("express").Router();
const Cart = require("../models/Cart");

//create
router.post("/", verifyToken, async (req, res)=>{
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        return res.status(500).json(error)
    }
});

//update 
router.put("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body},
            {new:true}
            );
        res.status(200).json(updatedCart);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//delete
router.delete("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted!")
    } catch (error) {
        return res.status(500).json(error);
    }
});

//get user cart
router.get("/find/:userId", verifyTokenAndAuthorization, async(req, res)=>{
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//get all
router.get("/", verifyToken, async(req, res)=>{
    try {
        const carts = await Cart.finde();
        res.status(200).json(carts);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;