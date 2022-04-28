const express = require('express');
const router = express.Router();
const userModel = require('../Models/userModel');

router.post("/signup",async(req,res)=>{
    await searchAndInsert(req,res);
});

async function searchAndInsert(req,res){
    const newUser = new userModel({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        address: req.body.address,
        role: "USER"
    });

      const found = await userModel.findOne({username:req.body.username}).exec();
      //TODO come far funzionare il middleware userSearch
     if(found) {
          res.json( "ERRORE DA DEFINIRE"+ res.statusCode + found.username + " Account Already Registered");


      }else{
        try {
            const savedUser = await newUser.save();
            res.json(savedUser);

        } catch (err) {
            console.log(err)
            res.json({message: err});
        }
    }
}
module.exports = router;