const jwt = require("jsonwebtoken");
const Auth = require("../models/Auth");

const config = process.env;

const verifyToken = async (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
    token = token.replace("Bearer ", "");

    if (!token) {
        return res.status(403).send({msg: "Unauthorized: token required for authentication"});
    }

    // Check if token is present into db (check open session)
    const foundToken = await Auth.findOne({token: token}).exec();

    if(!foundToken){
        return res.status(401).send({msg: "Unauthorized: token expired"});
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY, null, null);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    next();
};

module.exports = verifyToken;
