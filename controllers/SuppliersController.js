const supplier = require ("../models/Supplier");

//POST - insert new supplier
exports.insertSupplier = [
    async function insertSupplier(req, res) {

        // find supplier by username
        const found = await supplier.findOne({username: req.body.username}).exec();

        if(found) {
            res.status(409).json({msg: "Fornitore già presente nel database"});
        } else {
            try {
                // set new supplier object
                const newSupplier = await initNewSupplier(req.body);

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
            res.status(404).json({msg:"Impossibile ottenere il fornitore"});
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

            res.status(200).json({msg: "Fornitore aggiornato con successi"});
        }
    } catch (err) {
        res.status(404).json({msg: "ID errato"});
    }
}];

//GET ALL suppliers
exports.getAllSuppliers = [
    async function getAllSuppliers(req,res){
        try {
            const suppliers = await supplier.find();
            res.status(200).json(suppliers);
        } catch (err) {
            res.status(400).json({ msg: "Impossibile ottenere il fornitore" });
        }
}];

//GET ONE supplier
exports.getOneSupplier = [
    async function getOneSuppliers(req,res){
    try{
        const _idReq = req.params.id;

        // find a supplier by id passed into url (req.params.id)
        const found = await supplier.findById(_idReq);

        if (!found) {
            res.status(404).json({msg: "Impossibile ottenere il fornitore"});
        } else {
            res.status(200).json(found);
        }
    } catch (err) {
        res.status(404).json({msg: "ID errato"});
    }
}];

async function initNewSupplier(supplierReq){
    return new supplier({
        username: supplierReq.username,
        name: supplierReq.name,
        surname: supplierReq.surname,
        phone: supplierReq.phone,
        email: supplierReq.email,
        address: supplierReq.address,
        company: supplierReq.company
    });
}
