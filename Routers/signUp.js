const express = require('express');
const router = express.Router();
const user = require('../Models/user');
const searchAndInsert = require('../Controllers/signUp');

router.post("/signup",searchAndInsert);

router.get("/confirmation/:token",async(req,res)=>{
    const tok = req.params.token;
    console.log("token= " + tok);
    const tok2 = req.body.token;
    console.log("token2= " + tok2);
    const found = await user.findOne({token:tok}).exec();
    //console.log(found.token);

});

module.exports = router;