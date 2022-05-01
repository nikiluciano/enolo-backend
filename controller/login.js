const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
const loginRes = require("../models/loginRes");
const User = require("../models/user");
const app = express();

app.post("/login", async (req, res) => {
    try {
        // Get user input req
        const username = req.body.username;
        const password = req.body.password;

        // Validate user input
        if (!(username && password)) {
            res.status(400).json({msg: "invalid Input"});
        }
        // Validate if user exist in our database
        const user = await User.findOne({username:username}).exec();
        if (user  && (await bcrypt.compare(password, user.password))) {
            // Create token
                    const token = jwt.sign(
                { username: username},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "12h",
                }, null
            );

            // save user token
            user.token = token;
            const response = new loginRes({
                token: token,
                role: user.role
            })
            // user
            res.status(200);
            res.json (response);
        } else {
            res.status(400).json({msg: "invalid Input"});
        }
    } catch (err) {
        console.log(err);
    }
});
module.exports = app;
