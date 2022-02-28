const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const router = require("express").Router();
const Product = require("../models/Product");

//create product
router.post("/", verifyTokenAndAdmin, async (req, res)=>{
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        return res.status(500).json(error)
    }
});

//update product 
router.put("/:id", verifyTokenAndAdmin, async (req, res)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body},
            {new:true}
            );
        res.status(200).json(updateUser);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//delete product
router.delete("/:id", verifyTokenAndAdmin, async(req, res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted!")
    } catch (error) {
        return res.status(500).json(error);
    }
});

//get product
router.get("/find/:id", async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//get all product
router.get("/", async(req, res)=>{
    const qnew = req.query.new;
    const qcategory = req.query.category;
    try {
        let products;
        if(qnew){
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        }else if(qcategory){
            products = await find({
                categories:{
                    $in: [qcategory],
                }
            });
        }else{
            products = await Product.find();
        };
        
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
});


module.exports = router;