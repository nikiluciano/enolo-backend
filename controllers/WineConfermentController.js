const wineConfermentModel = require("../models/WineConferment");
const warehouseModel = require("../models/Warehouse");

//Assign value to models fields
async function valueAssignement(req, res, date) {
    const wineConferment = new wineConfermentModel()

    try {
        wineConferment.country = req.body.country
        wineConferment.supplier = req.body.supplier
        wineConferment.description = req.body.description
        wineConferment.typology = req.body.typology
        wineConferment.origin = req.body.origin
        wineConferment._idworker = req.body._idworker
        wineConferment.date = date

        if(req.body.conferment_process == null){
            wineConferment.status = "DELIVERED"
        } else {
            wineConferment.status = "PENDING"
            wineConferment.conferment_process = req.body.conferment_process
        }

        if(req.body.wine_pressing_process != null){
            wineConferment.wine_pressing_process = req.body.wine_pressing_process
        }

        if(req.body.destemmig_process != null){
            wineConferment.destemmig_process = req.body.destemmig_process

        }

        if(req.body.winemaking_process != null){
            wineConferment.winemaking_process = req.body.winemaking_process

        }
        if(req.body.racking_process != null){
            wineConferment.racking_process = req.body.racking_process
        }

        if(req.body.refinement_process != null){
            wineConferment.refinement_process = req.body.refinement_process
        }

        if(!(req.body.bottling_process == null)){
            wineConferment.status = "READY"
            wineConferment.bottling_process = req.body.bottling_process
        }

        return wineConferment
    } catch (e) {
        res.status(500).json({msg: "Server error"});
    }
}

//Post method
exports.postWineConferment = [
    async function postWineConferment(req, res) {

        //Define date to insert it automatically into db
        let dateNowObj = new Date();
        let date = ("0" + dateNowObj.getDate()).slice(-2);
        let month = ("0" + (dateNowObj.getMonth() + 1)).slice(-2);
        let year = dateNowObj.getFullYear();
        let hours = dateNowObj.getHours();
        let minutes = ("0" + (dateNowObj.getMinutes())).slice(-2);
        let seconds = ("0" + (dateNowObj.getSeconds())).slice(-2);
        //format GG/MM/AA - HH/MM/SS
        dateNowObj = (date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds);

        const newWineConferment = await valueAssignement(req, res, dateNowObj)

        try {
            await newWineConferment.save();
            res.status(200);
            res.json({msg: "Wine Conferment inserted"});
        } catch (err) {
            res.status(400);
            res.json({msg: err.toString()});
        }
}];

// Get one conferment method
exports.getOneWineConferment = [
    async function getOneSuppliers(req, res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "There is no wine conferment with this id"});
            } else {
                res.status(200);
                res.send(found);
            }
        } catch (err) {
            res.json({msg: "Incorrect id"});
        }
    }];

/*
//patch method updating conferment by id
exports.updateWineConferment = [
    async function updateWineConferment (req,res) {
    try{
        const _idReq = req.params.id;
        const found = await wineConfermentModel.findById(_idReq);

        if(!found){
            res.status(400).json({msg: "There is no wine conferment with this id"});
        } else {
            await wineConfermentModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
            res.status(200).json({msg: "wine conferment updated successfully"});
        }
    }catch (err) {
        res.json({msg: "incorrect id"});
    }
}];
 */

//get all conferment method
exports.getAllWineConferment = [
    async function getAllWineConferment(req, res){
        try{
            const wineConferment = await wineConfermentModel.find();

            res.status(200);
            res.json(wineConferment);
        }catch (err){
            res.status(400);
            res.json({msg: "Couldn't get all wine conferment"});
        }
}];

//delete conferment method
exports.deleteWineConferment = [
    async function (req, res){
        try{
            const _idReq = req.params.id;
            await wineConfermentModel.findByIdAndRemove(_idReq)
            res.status(200);
            res.json({msg: "conferment deleted successfully"});
        } catch(err){
            res.json({ message: err.toString() });
        }
}];

/** PATCH processes */
exports.updateConfermentProcess = [
    async function confermentProcess (req,res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "There is no wine conferment with this id"});
            } else {

                found.conferment_process = {
                    quantity: req.body.quantity,
                    description: req.body.description
                }

                await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new:true});

                res.status(200).json({msg: "Conferment process updated successfully"});
            }
        } catch (err) {
            res.json({msg: "Incorrect id"});
        }
    }
];

exports.updateWinePressingProcess = [
    async function winePressingProcess (req,res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "There is no wine conferment with this id"});
            } else {

                found.wine_pressing_process = {
                    description: req.body.description
                }

                await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new:true});

                res.status(200).json({msg: "Conferment process updated successfully"});
            }
        } catch (err) {
            res.json({msg: "Incorrect id"});
        }
    }
];

exports.updateDestemmingProcess = [
    async function destemmingProcess (req,res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "There is no wine conferment with this id"});
            } else {
                found.destemming_process = {
                    waste: req.body.waste,
                    description: req.body.description
                }

                await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new:true});

                res.status(200).json({msg: "Destemming process updated successfully"});
            }
        } catch (err) {
            res.json({msg: "Incorrect id"});
        }
    }
];

exports.updateWinemakingProcess = [
    async function winemakingProcess (req,res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "There is no wine conferment with this id"});
            } else {

                found.winemaking_process = {
                    waste: req.body.waste,
                    description: req.body.description
                }

                await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new:true});

                res.status(200).json({msg: "Winemaking process updated successfully"});
            }
        } catch (err) {
            res.json({msg: "Incorrect id"});
        }
    }
];

exports.updateRackingProcess = [
    async function rackingProcess (req,res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "There is no wine conferment with this id"});
            } else {

                found.racking_process = {
                    description: req.body.description
                }

                await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new:true});

                res.status(200).json({msg: "Racking process updated successfully"});
            }
        } catch (err) {
            res.json({msg: "Incorrect id"});
        }
    }
];

exports.updateRefinementProcess = [
    async function refinementProcess (req,res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "There is no wine conferment with this id"});
            } else {

                found.refinement_process = {
                    description: req.body.description
                }

                await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new:true});

                res.status(200).json({msg: "Refinement process updated successfully"});
            }
        } catch (err) {
            res.json({msg: "Incorrect id"});
        }
    }
];

exports.updateBottlingProcess = [
    async function updateBottlingProcess (req,res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);
            const warehouse = await warehouseModel.findOne()

            if(!found){
                res.status(400).json({msg: "There is no wine conferment with this id"});
            } else {

                const bottlesAvailability = await checkWarehouseQuantitiesAvailability(warehouse.bottles_quantity, req.body.bottles_quantity)
                const capsAvailability = await checkWarehouseQuantitiesAvailability(warehouse.caps_quantity, req.body.caps_quantity)
                const tagsAvailability = await checkWarehouseQuantitiesAvailability(warehouse.tags_quantity, req.body.tags_quantity)

                console.log(bottlesAvailability)
                console.log(capsAvailability)
                console.log(tagsAvailability)

                if(bottlesAvailability && capsAvailability && tagsAvailability){
                    found.bottling_process = {
                        bottles_quantity: req.body.bottles_quantity,
                        caps_quantity: req.body.caps_quantity,
                        tags_quantity: req.body.tags_quantity
                    }

                    await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new:true});

                    await warehouseModel.update(
                        { $set: {
                                bottles_quantity: (warehouse.bottles_quantity - req.body.bottles_quantity),
                                caps_quantity: (warehouse.caps_quantity - req.body.caps_quantity),
                                tags_quantity: (warehouse.tags_quantity - req.body.tags_quantity) }
                        });

                    res.status(200).json({msg: "Bottling process updated successfully"});
                } else {
                    res.status(400).json({msg: "Not enough quantity of bottles, caps and tags"});
                }
            }
        } catch (err) {
            res.json({msg: "Incorrect id"});
        }
    }
];

async function checkWarehouseQuantitiesAvailability(available, request) {
    return (available - request) >= 0;
}
