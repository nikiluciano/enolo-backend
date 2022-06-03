const supplier = require ("../models/Supplier");

//POST - insert new supplier
exports.insertSupplier = [
    async function insertSupplier(req, res) {

        const newSupplier = new supplier({
            username: req.body.username,
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            company: req.body.company
        });

        const found = await supplier.findOne({username: req.body.username}).exec();

        if(found) {
            res.status(409).json({msg: "This supplier already exists"});
        } else {
            try {
                await newSupplier.save();
                res.status(200).json(newSupplier);
            } catch (err) {
                res.status(500).json({msg: err});
            }
        }
}];

//PATCH - update a supplier
exports.updateSupplier = [
    async function updateSupplier (req,res) {
    try{
        const _idReq = req.params.id;
        const found = await supplier.findById(_idReq);

        if(!found){
            res.status(404).json({msg:"Couldn't get the supplier"});
        } else {

            await supplier.updateOne(
                {_id: _idReq},
                {
                    $set: {
                        username: req.body.username,
                        email: req.body.email,
                        name: req.body.name,
                        surname: req.body.surname,
                        phone: req.body.phone,
                        address: req.body.address,
                        company: req.body.company
                    }
                });

            res.status(200).json({msg: "Supplier updated successfully"});
        }
    } catch (err) {
        res.status(404).json({msg: "Incorrect id"});
    }
}];

//GET ALL suppliers
exports.getAllSuppliers = [
    async function getAllSuppliers(req,res){
        try {
            const suppliers = await supplier.find();
            res.status(200).json(suppliers);
        } catch (err) {
            res.status(400).json({ msg:"Couldn't get all suppliers" });
        }
}];

//GET ONE supplier
exports.getOneSupplier = [
    async function getOneSuppliers(req,res){
    try{
        const _idReq = req.params.id;
        const found = await supplier.findById(_idReq);

        if (!found) {
            res.status(404).json({msg:"Couldn't get the supplier"});
        } else {
            res.status(200).json(found);
        }
    } catch (err) {
        res.status(404).json({msg: "Incorrect id"});
    }
}];
