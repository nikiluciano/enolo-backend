const express = require('express');
const router = express.Router();
const user = require('../Models/user');
const searchAndInsert = require('../Middlewares/searchAndInsert');
const emailConfirmation = require('../Middlewares/emailConfirmation');

router.post("/signup",searchAndInsert);

router.get("/confirmation/:token",async(req,res)=>{
const tok = req.params.token;
const found = await user.findOne({token: tok}).exec();

if (!found) {
    res.status(409); //TODO da definire
    res.json("ERROR " + res.statusCode + " An Error was occured during email confirmation");
}
found.status = "ACTIVE";
try {
    await found.save();
    res.json("Registration completed");
} catch (err) {
    res.status(400);
    res.json({msg: err});
}

});

module.exports = router;