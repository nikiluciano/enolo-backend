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
                res.status(400).json({msg: "Email e password non possono essere vuote"});
                return
            }

            // Validate if user exist in our database
            const user = await User.findOne({username:username}).exec();
            const auth = await Auth.findOne({username:username}).exec();

            if (user  && (await bcrypt.compare(password, user.password))) {

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

                /** IMPORTANT:
                 * if user is not logged in it saves newAuth object into Auth collection,
                 * otherwise update Auth document with the same username;
                 * Update token means that this app works on a single session: if a user is
                 * already logged on first device , when he does the login on second device
                 * then the session of the first device has expired.
                 * */
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
                res.status(400).json({msg: "Email o password sbagliate"});
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

            // find user by username
            const found = await Auth.findOne({username: username}).exec();

            if (!found){
                res.status(404).json({msg: "Token non presente nel database"});
            } else {
                if(refreshToken === found.refreshToken) {
                    const tokenGenerated = await createToken(username);
                    const refreshTokenGenerated = await refreshJwtGenerated(username);

                    // update user's token and refresh token; user searched by username
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
                    res.status(404).json({msg: "Refresh token errato"});
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

            // find user by username
            const found = await Auth.findOne({username: username}).exec();

            if(!found){
                res.status(404).json({msg: "L'utente " + found.username + " non ha effettutato il login"});
            } else {
                await Auth.deleteOne({username: found.username});
                res.status(200).json({msg: "Utente disconnesso con successo"})
            }
        } catch (err) {
            res.json({msg: err})
        }
    }
];

// function that generates new token
 async function createToken(username){
     return jwt.sign(
         { username: username },
         process.env.TOKEN_KEY,
         {expiresIn: "12h"},
         null
     );
}

// function that generates refresh token
async function refreshJwtGenerated(username){
    return jwt.sign(
        { username: username },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: "24h" },
        null);
}
