const supplier = require ("../models/Supplier");

//POST
exports.insertSupplier =
    async function insertSupplier(req, res) {
        await valueAssignment(req,res);

        const newSupplier = new supplier({
            username: req.usernameReq,
            name: req.nameReq,
            surname: req.surnameReq,
            phone: req.phoneReq,
            email: req.emailReq,
            address: req.addressReq,
            company: req.companyReq
        });
        const found = await supplier.findOne({username: req.usernameReq}).exec();
        if (found) {
            res.status(409);
            res.json({msg: "This supplier already exists"});
        } else {
            try {
                const savedSupplier = await newSupplier.save();
                res.status(200);
                res.json("Account inserted");
            } catch (err) {
                res.status(500).json({msg: "Server error"});
            }
        }
    }

//PATCH
exports.updateSupplier =
    async function updateSupplier (req,res) {
        const idReq = req.params.id;
        console.log(idReq);
        const usernameReq = req.body.username;
        const found = await supplier.findOne({username: usernameReq}).exec();
        if(usernameReq === null){
            res.status(404).send("Username field should not be empty");
        } else if (found){
            res.status(409).json({msg: "This supplier already exists"});
        }
        await supplier.findByIdAndUpdate(idReq, req.body,{new:true});
        res.status(200).json("Supplier updated successfully");
        }

//GET ALL
exports.getAllSuppliers =
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


//GET ONE
exports.getOneSupplier =
    async function getOneSuppliers(req,res){
        const idReq = req.params.id;
        console.log(idReq);
        const found = await supplier.findOne({id:idReq}).exec();
        if (!found) {
            res.status(400);
            res.json("Couldn't get the supplier");
        } else {
            res.status(200);
            res.json(found);
        }
    }

async function valueAssignment(req, res){
    try{
        req.usernameReq = req.body.username.replace(/ /g, '');
        req.nameReq = req.body.name.replace(/ /g, '');
        req.surnameReq = req.body.surname.replace(/ /g, '');
        req.phoneReq = req.body.phone.replace(/ /g, '');
        req.emailReq = req.body.email.replace(/ /g, '');
        req.addressReq = req.body.address.replace(/ /g, '');
        req.companyReq = req.body.company.replace(/ /g, '');
    }catch(e) {
        console.log(e);
        res.status(500).send("Server error");
    }
}
