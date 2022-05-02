const express = require('express');
const router = express.Router();
const searchAndInsert = require('../Middlewares/searchAndInsert');

router.post("/signup",async(req,res)=>{
    await searchAndInsert(req,res);
});


module.exports = router;