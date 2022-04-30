const bcrypt = require('bcrypt');
const user = require('../Models/user');
const jwt = require("jsonwebtoken");
const emailConfirmation = require ("../Config/emailConfirmation")

//const nodemailer = require ('nodemailer');

module.exports = async function searchAndInsert(req,res,next){
    const encryptedPassword = await bcrypt.hash(req.body.password,10);
    const token = jwt.sign({username:req.body.username},process.env.SECRET,null,null);
    const newUser = new user({
        username: req.body.username,
        password: encryptedPassword,
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        address: req.body.address,
        role: "WORKER",
        token: token
    });

    const foundUsername = await user.findOne({username:req.body.username}).exec();
    const foundEmail =  await user.findOne({email:req.body.email}).exec();
    if(foundUsername) {
        res.status(409);
        res.json("ERROR "+ res.statusCode + " " + foundUsername.username + "Already In Use" );
    } else if(foundEmail) {
        res.status(409);
        res.json("ERROR "+ res.statusCode + " " + foundEmail.email + "Already In Use" );
        //res.json({msg:"This account already exist"});
    } else {

        try {
            const savedUser = await newUser.save();
            res.json(savedUser);
            emailConfirmation(req,res,token);
        } catch (err) {
            console.log(err)
            res.status(400);
            res.json({msg: err});
        }
    }
    next();
    console.log("tokennnn:"+token);
    exports.token = token ;
}



