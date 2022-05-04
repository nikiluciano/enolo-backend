const bcrypt = require('bcrypt');
const user = require('../models/user');
const jwt = require("jsonwebtoken");
const email = require("../config/email")

exports.registerUser = [
    async function registerUser(req, res, next) {
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const token = jwt.sign({username: req.body.username},
            process.env.TOKEN_KEY, {expiresIn: "12h"}, null);
        const newUser = new user({
            username: req.body.username,
            password: encryptedPassword,
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            address: req.body.address,
            role: "WORKER",
            status: "PENDING"
        });

        const foundUsername = await user.findOne({username: req.body.username}).exec();
        const foundEmail = await user.findOne({email: req.body.email}).exec();
        if (foundUsername) {
            res.status(409);
            res.json("ERROR " + res.statusCode + " " + foundUsername.username + "Already In Use");
        } else if (foundEmail) {
            res.status(409);
            res.json("ERROR " + res.statusCode + " " + foundEmail.email + "Already In Use");
            //res.json({msg:"This account already exist"});
        } else {
            try {
                const savedUser = await newUser.save();
                res.json(savedUser);
                email(req, res, token);
            } catch (err) {
                console.log(err)
                res.status(400);
                res.json({msg: err});
            }
        }
    }];
        exports.emailConfirmation = [
            async function emailConfirmation(req, res) {
                const usernameReq = req.params.username;
                const found = await user.findOne({username: usernameReq}).exec();

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
            }];



