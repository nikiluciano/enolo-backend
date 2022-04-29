const express = require('express');
const router = express.Router();
const userModel = require('../Models/user');
//const bcrypt = require ('bcrypt');
//const nodemailer = require ('nodemailer');
const searchAndInsert = require('../Controllers/signUp');

/*let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'ccc41709@gmail.com',
        pass:' '
    }
});
*/

router.post("/signup",async(req,res)=>{
    await searchAndInsert(req,res);
 /*   let mailOption = {
        from: 'ccc41709@gmail.com',
        to: req.body.email,
        subject: "Registration confirmed",
        text: "Your account is inserted in DB"
        };
        transporter.sendMail(mailOption,function(err,info){
            if(err){
                console.log("Impossible to send email");
               //res.json("Impossible to send email"); come fare uscire questi messaggi dato che ci sono dei res.json prima
            } else {
                console.log("Email sent");
                //res.json("Email sent");
            }
        });*/
});


module.exports = router;