const bcrypt = require('bcrypt');
const userModel = require('../Models/user');
const jwt = require("jsonwebtoken");
const emailConfirmation = require ("../Config/emailConfirmation")

//const nodemailer = require ('nodemailer');

module.exports = async function searchAndInsert(req,res){
    const encryptedPassword = await bcrypt.hash(req.body.password,10);
    const token = jwt.sign({username:req.body.username},process.env.SECRET,null,null);
    const newUser = new userModel({
        username: req.body.username,
        password: encryptedPassword,
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        address: req.body.address,
        role: "USER",
        token: token
    });

    const foundUsername = await userModel.findOne({username:req.body.username}).exec();
    const foundEmail =  await userModel.findOne({email:req.body.email}).exec();
    if(foundUsername) {
        res.status(409);
        res.json("ERROR "+ res.statusCode + " " + found.username + "Already In Use" );
    } else if(foundEmail) {
        res.status(409);
        res.json("ERROR "+ res.statusCode + " " + found.email + "Already In Use" );
    }
    else {
        try {
            const savedUser = await newUser.save();
            res.json(savedUser);
            emailConfirmation(req,res,token);
        } catch (err) {
            console.log(err)
            res.status(400);
            res.json("Error "+ res.statusCode +" "+ {message: err});
        }
    }
}



