const wineConfermentModel = require("../models/WineConferment");
const warehouseModel = require("../models/Warehouse");
const url = require('url');

//Assign value to models fields
async function initNewConferment(req, res) {
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
        res.status(500).json({msg: "Errore del server"});
    }
}

async function checkWarehouseQuantitiesAvailability(available, request) {
    return (available - request) >= 0;
}

// CREATE a conferment
exports.postWineConferment = [
    async function postWineConferment(req, res) {

        const newWineConferment = await initNewConferment(req, res)

        try {
            if(newWineConferment.date == null){
                newWineConferment.date = Date.now();

                await newWineConferment.save();

                res.status(200).json({msg: "Conferimento inserito con successo"});
            }else {
                await newWineConferment.save();
                res.status(200).json({msg: "Conferimento inserito con successo"});
            }

        } catch (err) {
            res.status(400);
            res.json({msg: err.toString()});
        }
}];

// GET one conferment
exports.getOneWineConferment = [
    async function getOneWineConferment(req, res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "Non ci sono conferimenti con questo Id"});
            } else {
                res.status(200).json(found);
            }
        } catch (err) {
            res.json({msg: "ID sbagliato"});
        }
}];


// GET ALL conferments
exports.getAllWineConferment = [
    async function getAllWineConferment(req, res){
        try{
            const wineConferment = await wineConfermentModel.find().sort({"updatedAt": -1});

            res.status(200).json(wineConferment);
        }catch (err){
            res.status(400).json({msg: "Impossibile ottenere tutti i conferimenti"});
        }
}];

// GET ALL conferments by filters (status, supplier, typology, sort)
exports.getConfermentsByFilters = [
    async function getConfermentsByFilters(req, res){
        try{
            const queryUrl = url.parse(req.url, true).query;

            const status = queryUrl["status"];
            const supplier = queryUrl["supplier"];
            const typology = queryUrl["typology"];
            let sort = queryUrl["sort"];

            const filter = {
                status: status,
                supplier: supplier,
                typology: typology
            }

            if(status === undefined) delete filter.status
            if(supplier === undefined) delete filter.supplier
            if(typology === undefined) delete filter.typology

            // if sort is undefined, default value is -1
            if(sort === undefined){
                sort = -1
            }

            const wineConferment = await wineConfermentModel.find(
                filter
            ).sort({"updatedAt": sort}).exec();

            res.status(200).json(wineConferment);
        } catch (err) {
            res.status(400).json({msg: "Impossibile ottenere i conferimenti richiesti"});
        }
    }
];

// DELETE conferment
exports.deleteWineConferment = [
    async function (req, res){
        try{
            const _idReq = req.body.id;

            console.log(req.body);

            await wineConfermentModel.findByIdAndRemove(_idReq)

            res.status(200).json({msg: "Conferimento eliminato con successo"});
        } catch(err){
            res.json({ message: err.toString() });
        }
}];

/** PATCH processes */
exports.updateWinePressingProcess = [
    async function winePressingProcess (req,res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "Non ci sono conferimenti con questo ID"});
            } else {
                found.status = "PENDING"
                found.current_process = "wine_pressing_process"

                found.wine_pressing_process = {
                    description: req.body.description
                }

                await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new:true});

                res.status(200).json({msg: "Pressatura aggiornata con successo"});
            }
        } catch (err) {
            res.json({msg: "ID sbagliato"});
        }
    }
];

exports.updateDestemmingProcess = [
    async function destemmingProcess (req,res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "Non ci sono conferimenti con questo ID"});
            } else {
                found.status = "PENDING"
                found.current_process = "destemming_process"

                found.destemming_process = {
                    waste: req.body.waste,
                    description: req.body.description
                }

                await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new:true});

                res.status(200).json({msg: "Diraspatura aggiornata con successo"});
            }
        } catch (err) {
            res.json({msg: "ID sbagliato"});
        }
    }
];

exports.updateWinemakingProcess = [
    async function winemakingProcess (req,res) {

        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);
            if(!found){
                res.status(400).json({msg: "Non ci sono conferimenti con questo ID"});
            } else {
                found.status = "PENDING"
                found.current_process = "winemaking_process"

                found.winemaking_process = {
                    waste: req.body.waste,
                    description: req.body.description
                }
                await wineConfermentModel.findByIdAndUpdate(_idReq, found, {new:true});

                res.status(200).json({msg: "Vinificazione aggiornata con successo"});
            }
        } catch (err) {
            res.status(400).json({msg: "ID sbagliato"});
        }
    }
];

exports.updateRackingProcess = [
    async function rackingProcess (req,res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "Non ci sono conferimenti con questo ID"});
            } else {
                found.status = "PENDING"
                found.current_process = "racking_process"

                found.racking_process = {
                    description: req.body.description
                }

                await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new:true});

                res.status(200).json({msg: "Svinatura aggiornata con successo"});
            }
        } catch (err) {
            res.json({msg: "ID sbagliato"});
        }
    }
];

exports.updateRefinementProcess = [
    async function refinementProcess (req,res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "Non ci sono conferimenti con questo ID"});
            } else {
                found.status = "PENDING"
                found.current_process = "refinement_process"

                found.refinement_process = {
                    description: req.body.description
                }

                await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new:true});

                res.status(200).json({msg: "Raffinamento aggiornato con successo"});
            }
        } catch (err) {
            res.json({msg: "ID sbagliato"});
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
                res.status(400).json({msg: "Non ci sono conferimenti con questo ID"});
            } else {
                // checks bottles availability into watehouse
                const bottlesAvailability = await checkWarehouseQuantitiesAvailability(
                    warehouse.bottles.bottles_quantity,
                    req.body.bottles.bottles_quantity
                )

                // checks caps availability into watehouse
                const capsAvailability = await checkWarehouseQuantitiesAvailability(
                    warehouse.caps_quantity,
                    req.body.caps_quantity
                )

                // checks tags availability into watehouse
                const tagsAvailability = await checkWarehouseQuantitiesAvailability(
                    warehouse.tags_quantity,
                    req.body.tags_quantity
                )

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
                    res.status(400).json({msg:"Bottiglie con capienza " + req.body.bottles.format + " non presenti nel dateabase"});
                } else {
                    if ((format.quantity >= req.body.bottles.bottles_quantity) && bottlesAvailability && capsAvailability && tagsAvailability) {
                        found.status = "READY"
                        found.current_process = "bottling_process"

                        // conferment model update
                        found.bottling_process = {
                            bottles: req.body.bottles,
                            caps_quantity: req.body.caps_quantity,
                            tags_quantity: req.body.tags_quantity
                        }

                        // warehouse model update
                        warehouse.bottles.bottles_quantity -= req.body.bottles.bottles_quantity
                        warehouse.caps_quantity -= req.body.caps_quantity
                        warehouse.tags_quantity -= req.body.tags_quantity

                        format.quantity -= req.body.bottles.bottles_quantity

                        warehouse.bottles.formats[i] = format

                        await wineConfermentModel.findByIdAndUpdate(req.params.id, found, {new: true}); // conferment update
                        await warehouseModel.updateOne({}, warehouse); // warehouse update

                        res.status(200).json({msg: "Imbottigliamento aggiornato con successo!"})
                    } else {
                        res.status(400).json({msg: "Quantità di bottiglie, tappi o etichette insufficiente nel magazzino"});
                    }
                }
            }
        } catch (err) {
            res.json({msg: "ID sbagliato" + err});
        }
    }
];
