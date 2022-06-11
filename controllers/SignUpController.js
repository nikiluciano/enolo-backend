const bcrypt = require("bcrypt");
const userModel = require("../models/User");

exports.signup = [
    async function registerUser(req,res) {

        /** by default when new user is registered, he is a "WORKER";
         * Only an admin has permission to change his role into an "ADMIN" */
        const roleReq = "WORKER"

        if(req.body.password === ""){
            res.status(400).json( {msg:"Password field should not be empty"} );
            return
        }

        // generate encrypted password
        const encryptedPassword = await bcrypt.hash(req.body.password,10);

        // find user by username
        const found = await userModel.findOne({username: req.body.username}).exec();

        if(found) {
            res.status(409).json( {msg:"This account already exists"} );
        } else {
            try {
                // init new user
                const newUser = await initNewUser(req.body, encryptedPassword, roleReq)
                const savedUser = await newUser.save();

                res.status(200).json(savedUser);
            } catch (err) {
                console.log(err)
                res.status(400).json({msg: err});
            }
        }
}];

async function initNewUser(user, pass, role){
    return new userModel({
        username: user.username,
        password: pass,
        email: user.email,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        address: user.address,
        role: role
    });
}
