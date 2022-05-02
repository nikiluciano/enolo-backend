const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const app = express();

app.post("/login", async (req, res) => {
    try {
        // Get user input req
        const username = req.body.username;
        const password = req.body.password;

        // Validate user input
        if (!(username && password)) {
            res.status(400).json( {msg: "Email and password should not be empty"} );
            return
        }

        // Validate if user exist in our database
        const user = await User.findOne({username:username}).exec();
        if (user  && (await bcrypt.compare(password, user.password))) {
            // Create token
            const tokenGenerated = jwt.sign(
                { username: username },
                process.env.TOKEN_KEY,
                { expiresIn: "12h" },
                null
            );

            res.status(200);
            res.json( {token: tokenGenerated , role: user.role} );
        } else {
            res.status(400).json( {msg: "The email or password you entered is incorrect"} );
        }

    } catch (err) {
        console.log(err);
    }
});

module.exports = app;
