const router = require("express").Router();

router.get("/", (req, res)=>{
    res.send("from products")
})
module.exports = router;