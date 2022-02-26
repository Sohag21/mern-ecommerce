const router = require("express").Router();

router.get("/", (req, res)=>{
    res.send("from cart")
})
module.exports = router;