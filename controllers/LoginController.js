const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Auth = require("../models/Auth");

exports.login = [
    async function login(req, res) {
    // Get user input req
        const username = req.body.username;
        const password = req.body.password;

        try {
            // Validate user input
            if (!(username && password)) {
                res.status(400).json( {msg: "Email and password should not be empty"} );
                return
            }

            // Validate if user exist in our database
            const user = await User.findOne({username:username}).exec();
            const auth = await Auth.findOne({username:username}).exec();

            if (user  && (await bcrypt.compare(password, user.password))) {

                // Create token
                const tokenGenerated =  await createToken(username)

                const refreshTokenGenerated = await refreshJwtGenerated(username)

                const response = {
                    token: tokenGenerated,
                    refreshToken: refreshTokenGenerated,
                    role: user.role
                };

                const newAuth = new Auth({
                    username: username,
                    token: tokenGenerated,
                    refreshToken: refreshTokenGenerated
                })

                if(!auth) {
                    await newAuth.save();
                } else {
                    await Auth.updateOne(
                        {username: username},
                        {
                            $set: {
                                token: tokenGenerated,
                                refreshToken: refreshTokenGenerated
                            }
                        }
                    )
                }

                res.status(200).json(response);
            } else {
                res.status(400).json( {msg: "The email or password you entered is incorrect"} );
            }

        } catch (err) {
            console.log(err);
        }
}];

exports.refreshToken = [
    async function refreshToken(req, res) {
        try{
            const refreshToken = req.body.refreshToken
            const username = req.body.username

            const found = await Auth.findOne({username: username}).exec();

            if (!found){
                res.status(404).json({msg: "Token not present into database"});
            } else {
                if(refreshToken === found.refreshToken) {
                    const tokenGenerated = createToken(username);

                    const refreshTokenGenerated = refreshJwtGenerated(username);

                    console.log("new token " + tokenGenerated);
                    console.log("new refresh token  " + refreshTokenGenerated);

                    await Auth.updateOne(
                        {username: found.username},
                        {
                            $set: {
                                token: tokenGenerated,
                                refreshToken: refreshTokenGenerated
                            }
                        }
                    )

                    res.status(200).json({
                        token: tokenGenerated,
                        refreshToken: refreshTokenGenerated
                    })
                } else {
                    res.status(404).json({msg: "Refresh token incorrect"});
                }
            }
        } catch (err) {
            res.json({msg: err})
        }
    }
]

exports.logout = [
    async function logout(req, res){
        try{
            const username = req.body.username

            const found = await Auth.findOne({username: username}).exec();

            if(!found){
                res.status(404).json({msg: "User is not logged in"});
            }else{
                res.status(200).json({msg: "Session ended "})
                await Auth.deleteOne({username: found.username});
            }
        }catch (err){
            res.json({msg: err})
        }
    }
]
 async function createToken(username){
     return jwt.sign(
         { username: username },
         process.env.TOKEN_KEY,
         { expiresIn: "12h" },
         null
     );
}

async function refreshJwtGenerated(username){
    return jwt.sign(
        { username: username },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: "24h" },
        null);
}
