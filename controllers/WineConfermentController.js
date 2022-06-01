const wineConfermentModel = require("../models/WineConferment");
const warehouseModel = require("../models/Warehouse");

//Assign value to models fields
async function valueAssignement(req, res) {
    const wineConferment = new wineConfermentModel()

    try {
        wineConferment.country = req.body.country
        wineConferment.supplier = req.body.supplier
        wineConferment.description = req.body.description
        wineConferment.typology = req.body.typology
        wineConferment.origin = req.body.origin
        wineConferment._idworker = req.body._idworker
        wineConferment.date = req.body.date
        wineConferment.quantity = req.body.quantity

        if(req.body.wine_pressing_process == null){
            wineConferment.status = "DELIVERED"
        } else {
            wineConferment.status = "PENDING"
            wineConferment.current_process = "wine_pressing_process"
            wineConferment.wine_pressing_process = req.body.wine_pressing_process
        }

        if(req.body.destemmig_process != null){
            wineConferment.current_process = "destemmig_process"
            wineConferment.destemmig_process = req.body.destemmig_process

        }

        if(req.body.winemaking_process != null){
            wineConferment.current_process = "winemaking_process"
            wineConferment.winemaking_process = req.body.winemaking_process

        }
        if(req.body.racking_process != null){
            wineConferment.current_process = "racking_process"
            wineConferment.racking_process = req.body.racking_process
        }

        if(req.body.refinement_process != null){
            wineConferment.current_process = "refinement_process"
            wineConferment.refinement_process = req.body.refinement_process
        }

        if(!(req.body.bottling_process == null)){
            wineConferment.status = "READY"
            wineConferment.current_process = "bottling_process"
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

        const newWineConferment = await valueAssignement(req, res)

        try {
            if(newWineConferment.date == null){
                const dateNow = Date.now();

                newWineConferment.date = dateNow;

                await newWineConferment.save();

                res.status(200).json({msg: "Wine Conferment inserted"});
            }else {
                await newWineConferment.save();
                res.status(200).json({msg: "Wine Conferment inserted"});
            }

        } catch (err) {
            res.status(400);
            res.json({msg: err.toString()});
        }
}];

// Get one conferment method
exports.getOneWineConferment = [
    async function getOneWineConferment(req, res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "There is no wine conferment with this id"});
            } else {
                res.status(200).json(found);
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
            const wineConferment = await wineConfermentModel.find().sort({"updatedAt": -1});

            res.status(200).json(wineConferment);
        }catch (err){
            res.status(400).json({msg: "Couldn't get all wine conferment"});
        }
}];

//delete conferment method
exports.deleteWineConferment = [
    async function (req, res){
        try{
            const _idReq = req.params.id;
            await wineConfermentModel.findByIdAndRemove(_idReq)
            res.status(200).json({msg: "conferment deleted successfully"});
        } catch(err){
            res.json({ message: err.toString() });
        }
}];

/** PATCH processes */
/*
exports.updateConfermentProcess = [
    async function confermentProcess (req,res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "There is no wine conferment with this id"});
            } else {
                found.status = "PENDING"

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
 */

exports.updateWinePressingProcess = [
    async function winePressingProcess (req,res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "There is no wine conferment with this id"});
            } else {
                found.status = "PENDING"
                found.current_process = "wine_pressing_process"

                found.wine_pressing_process = {
                    description: req.body.description
                }

                await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new:true});

                res.status(200).json({msg: "Wine pressing process updated successfully"});
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
                found.status = "PENDING"
                found.current_process = "destemming_process"

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
                found.status = "PENDING"
                found.current_process = "winemaking_process"

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
                found.status = "PENDING"
                found.current_process = "racking_process"

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
                found.status = "PENDING"
                found.current_process = "refinement_process"

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
            const warehouse = await warehouseModel.findOne();

            if(!found){
                res.status(400).json({msg: "There is no wine conferment with this id"});
            } else {
                const bottlesAvailability = await checkWarehouseQuantitiesAvailability(warehouse.bottles.bottles_quantity, req.body.bottles.bottles_quantity)
                const capsAvailability = await checkWarehouseQuantitiesAvailability(warehouse.caps_quantity, req.body.caps_quantity)
                const tagsAvailability = await checkWarehouseQuantitiesAvailability(warehouse.tags_quantity, req.body.tags_quantity)

                const formats = warehouse.bottles.formats

                let i = 0
                let foundFormat = false

                while(formats.length > i){
                    if(formats[i].format === req.body.bottles.format){
                        foundFormat = true
                        break
                    }
                    i += 1
                }

                const format = formats[i]

                if(!foundFormat){
                    res.status(400).json({msg:"Bottles with capacity " + req.body.bottles.format + " not present into warehouse"});
                } else {
                    if ((format.quantity >= req.body.bottles.bottles_quantity) && bottlesAvailability && capsAvailability && tagsAvailability) {
                        found.status = "READY"
                        found.current_process = "bottling_process"

                        // conferment update
                        found.bottling_process = {
                            bottles: req.body.bottles,
                            caps_quantity: req.body.caps_quantity,
                            tags_quantity: req.body.tags_quantity
                        }

                        // warehouse update
                        warehouse.bottles.bottles_quantity -= req.body.bottles.bottles_quantity
                        warehouse.caps_quantity -= req.body.caps_quantity
                        warehouse.tags_quantity -= req.body.tags_quantity

                        format.quantity -= req.body.bottles.bottles_quantity

                        warehouse.bottles.formats[i] = format

                        await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new: true});
                        await warehouseModel.updateOne({}, warehouse);

                        res.status(200).json({msg: "Bottling process updated successfully!"})
                    } else {
                        res.status(400).json({msg: "Not enough quantity of bottles, caps and tags"});
                    }
                }
            }
        } catch (err) {
            res.json({msg: "Incorrect id" + err});
        }
    }
];

async function checkWarehouseQuantitiesAvailability(available, request) {
    return (available - request) >= 0;
}
