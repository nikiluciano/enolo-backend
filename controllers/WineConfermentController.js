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



        const newWineConferment = await valueAssignement(req, res)

        try {
            if(newWineConferment.date == null){
                const dateNow = Date.now();
                newWineConferment.date = dateNow;
                await newWineConferment.save();
                res.status(200);
                res.json({msg: "Wine Conferment inserted"});
            }else {
                await newWineConferment.save();
                res.status(200);
                res.json({msg: "Wine Conferment inserted"});
            }

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

exports.updateWinePressingProcess = [
    async function winePressingProcess (req,res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "There is no wine conferment with this id"});
            } else {
                found.status = "PENDING"

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
                found.status = "PENDING"

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
                console.log(" bottlesAvailability " + bottlesAvailability + " capsAvailability " + capsAvailability +
                    " tagsAvailability " + tagsAvailability);
                if (bottlesAvailability && capsAvailability && tagsAvailability) {
                    found.status = "READY"

                    found.bottling_process = {
                        bottles: req.body.bottles,
                        caps_quantity: req.body.caps_quantity,
                        tags_quantity: req.body.tags_quantity
                    }

                    await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new: true});

                    const format = req.body.bottles.format;
                    const bottlesRemained = warehouse.bottles.bottles_quantity - req.body.bottles.bottles_quantity;

                    const formats = warehouse.bottles.formats;
                    //   console.log("formats="+ formats);
                    let index = -1;
                    let formatQuantity = -1;

                    for (let i = 0; i < formats.length; i++) {
                        if (formats[i].format.toString() == format.toString()) {
                            formatQuantity = formats[i].bottles_quantity;
                            index = i;
                            await formats[index].update({$set: {quantity: formatQuantity-req.body.bottles.bottles_quantity}})
                            await warehouse.update(
                                {
                                    $set: {
                                        caps_quantity: warehouse.caps_quantity - req.body.caps_quantity,
                                        tags_quantity: warehouse.tags_quantity - req.body.tags_quantity
                                    }
                                });
                             await warehouse.bottles.update({$set: {bottles_quantity: bottlesRemained}});
                    } else if (i == formats.length - 1 && index == -1) {
                        res.status(400).json("errore");
                    }
                }

            } else {
                    console.log("bottles_quantity:"+warehouseModel.bottles_quantity);
                    res.status(400).json({msg: "Not enough quantity of bottles, caps and tags"});
                }
            }
        } catch (err) {
            res.json({msg: "Incorrect id"});
        }
    }
];

async function checkWarehouseQuantitiesAvailability(available, request) {
    console.log("available="+available+"  request= "+ request)
    return (available - request) >= 0;
}
