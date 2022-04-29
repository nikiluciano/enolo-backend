const bcrypt = require("bcrypt");
const userModel = require("../Models/user");

module.exports = async function searchAndInsert(req,res){
    const encryptedPassword = await bcrypt.hash(req.body.password,10);

    const newUser = new userModel({
        username: req.body.username,
        password: encryptedPassword,
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        address: req.body.address,
        role: "USER"
    });

    const found = await userModel.findOne({username:req.body.username}).exec();
    //TODO come far funzionare il middleware userSearch
    if(found) {
        res.status(409);
        res.json({msg:"This account already exist"});
    } else {
        try {
            const savedUser = await newUser.save();
            res.json(savedUser);
            //Scrivi codice email
        } catch (err) {
            console.log(err)
            res.status(400);
            res.json({msg: err});
        }
    }
}
