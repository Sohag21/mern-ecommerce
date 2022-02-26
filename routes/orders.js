const router = require("express").Router();

router.get("/", (req, res)=>{
    res.send("from orders")
})
module.exports = router;