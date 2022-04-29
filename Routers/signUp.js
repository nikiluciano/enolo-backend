const express = require('express');
const router = express.Router();
const userModel = require('../Models/user');
const searchAndInsert = require('../Controllers/signUp');



router.post("/signup",async(req,res)=>{
    await searchAndInsert(req,res);
});

router.get("confirmation")

module.exports = router;