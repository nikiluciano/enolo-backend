const bcrypt = require("bcrypt");
const userModel = require("../models/user");

module.exports = async function registerUser(req,res) {
    //fun replace removes all white spaces
    const passwordReq = req.body.password;
    const usernameReq = req.body.username.replace(/ /g, '');
    const emailReq = req.body.email.replace(/ /g, '');
    const nameReq = req.body.name.replace(/ /g, '');
    const surnameReq = req.body.surname.replace(/ /g, '');
    const phoneReq = req.body.phone.replace(/ /g, '');
    const addressReq = req.body.address.replace(/ /g, '');
    const roleReq = "WORKER"

    if(passwordReq === ""){
        res.status(400).json( {msg:"Password field should not be empty"} );
        return
    }

    const encryptedPassword = await bcrypt.hash(passwordReq,10);
    const newUser = new userModel({
        username: usernameReq,
        password: encryptedPassword,
        email: emailReq,
        name: nameReq,
        surname: surnameReq,
        phone: phoneReq,
        address: addressReq,
        role: roleReq
    });

    const found = await userModel.findOne({username:req.body.username}).exec();
    if(found) {
        res.status(409);
        res.json( {msg:"This account already exists"} );
    } else {
        try {
            const savedUser = await newUser.save();
            res.json(savedUser);
        } catch (err) {
            console.log(err)
            res.status(400);
            res.json( {msg: err} );
        }
    }
}
