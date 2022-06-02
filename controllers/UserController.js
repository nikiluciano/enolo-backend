const userModel = require("../models/User")

exports.getAllUsers = [
    async function getAllUsers(req, res) {
        try {
            const users = await userModel.find()
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json({msg: "Cannot get all users"})
        }
    }];

exports.getOneUser = [
    async function getOneUser(req, res) {
        try {
            const found = await userModel.findOne({username: req.params.username});
            if (!found) {
                res.status(404).json({msg: "There is no users with this username"});
            } else {
                res.status(200).json(found);
            }
        } catch (err) {
            res.status(400).json({msg: "Incorrect username"});
        }
    }];

exports.updateRole = [
    async function updateRole(req, res) {
        try{
            const found = await userModel.findOne({username: req.params.username});
            if (!found) {
                res.status(404).json({msg: "There is no users with this username"});
            } else {
                found.role = req.body.role;
                res.status(200).json({msg: "Role changed successfully"});
            }
        } catch (err) {
            res.status(400).json({msg:err.toString() });
        }
    }];

exports.patchUser = [
    async function patchUser(req, res) {
    const user = new userModel();
    try{
       const exist = await userModel.findOne({username: req.body.username});
        if(!exist)
            user.username = req.body.username;
        else{
            res.status(409).json("An account with this username already exists")
        }
        user.email = req.body.email;
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.phone = req.body.phone;
        user.address = req.body.address;

    } catch(e){
        res.status(400).json(e.toString());
    }
        console.log("user="+user+"\n");
        console.log("link="+req.params.username)
        try {
          //  await userModel.updateOne({username: req.params.username},user);
           const filter = {username:req.params.username}
           const found = await userModel.updateOne(filter,user);
           console.log("found"+found)
           res.status(200).json({msg: "User updated successfully"});

        } catch (err) {
            res.status(404).json({msg: "Incorrect username"});
        }
    }];

exports.deleteUser = [
    async function deleteUser(req, res) {
        const found = await userModel.deleteOne({username:req.params.username})
        if(!found)
            res.status(400).json({msg: "There is no users with this username"});
        else
            res.status(200).json({msg:"User deleted successfully"});
}]