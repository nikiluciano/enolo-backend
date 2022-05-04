const supplier = require("../models/supplier");

exports.insertSupplier = [
    async function insertSupplier(req, res) {
        const usernameReq = req.body.username.replace(/ /g, '');
        const nameReq = req.body.name.replace(/ /g, '');
        const surnameReq = req.body.surname.replace(/ /g, '');
        const phoneReq = req.body.phone.replace(/ /g, '');
        const emailReq = req.body.email.replace(/ /g, '');
        const addressReq = req.body.address.replace(/ /g, '');
        const companyReq = req.body.company.replace(/ /g, '');

        const newSupplier = new supplier({
            username: usernameReq,
            name: nameReq,
            surname: surnameReq,
            phone: phoneReq,
            email: emailReq,
            address: addressReq,
            company: companyReq
        });
        const found = await supplier.findOne({username: usernameReq}).exec();
        if (found) {
            res.status(409);
            res.json({msg: "This supplier already exists"});
        } else {
            try {
                const savedSupplier = await newSupplier.save();
                res.status(200);
                res.json("Account inserted");
            } catch (err) {
                console.log(err)
                res.status(400);
                res.json({msg: err});
            }
        }
    }];

exports.getAllSuppliers = [
    async function getAllSuppliers(req,res){
        try {
            res.status(200); /** credo sia inutile scriverlo ogni volta)*/
            const suppliers = await supplier.find();
            res.json({ suppliers });
        } catch (err) {
            res.status(400);
            console.log(res.body);
            res.json({ message:"Couldn't get all suppliers" });
        }
    }
];

exports.getOneSupplier = [
    async function getOneSuppliers(req,res){
        const usernameReq = req.params.username;
        console.log(usernameReq);
        const found = await supplier.findOne({username:usernameReq}).exec();
        if (!found) {
            res.status(400);
            res.json("Couldn't get the supplier");
        } else {
            res.status(200);
            res.json(found);
        }
    }];