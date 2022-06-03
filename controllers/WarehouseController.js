const warehouseModel = require("../models/Warehouse");

const CAPS = "Caps"
const TAGS = "Tags"

async function insertIntoWarehouse(req, res){
    const warehouse = new warehouseModel()

    if(req.body.bottles.bottles_quantity >= 0 &&
        req.body.caps_quantity >= 0 &&
        req.body.tags_quantity >= 0){

        warehouse.bottles = req.body.bottles
        warehouse.caps_quantity = req.body.caps_quantity
        warehouse.tags_quantity = req.body.tags_quantity

        return warehouse
    } else {
        return null
    }
}

//GET method
exports.getWarehouse = [
    async function(req, res) {
        try{
            const warehouse = await warehouseModel.findOne()

            res.status(200).json(warehouse);
        } catch(err) {
            res.status(400).json({msg: err.toString()})
        }
    }
];

//POST method
exports.postWarehouse = [
    async function postWarehouse(req, res) {
        try{
            const warehouseIndex = await warehouseModel.find()

            if(warehouseIndex.length === 0){
                const warehouse = await insertIntoWarehouse(req, res)

                if(warehouse === null){
                    res.status(400).json({msg: "Quantities should be greater than -1!"});
                    return
                }

                await warehouse.save()

                res.status(200).json({msg: "Warehouse succesfully created!"});
            } else {
                res.status(400).json({msg: "Warehouse already created! Update it with PATCH function!"});
            }

        } catch(err) {
            res.status(400).json({msg: err.toString()})
        }
    }
];

// PATCH format array by adding a new format
exports.addFormat = [
    async function addFormat(req, res) {
        try{
            const warehouseList = await warehouseModel.find()

            if(warehouseList.length !== 0){

                const newFormat = {
                        format: req.body.format,
                        quantity: req.body.quantity,
                        description: req.body.description
                }

                const warehouse = warehouseList[0]

                let i = 0
                let found = false

                // checks if the format is already present
                while(warehouse.bottles.formats.length > i){

                    if(warehouse.bottles.formats[i].format === newFormat.format){
                        found = true
                        break
                    }
                    i += 1
                }

                if(!found){
                    warehouse.bottles.formats.push(newFormat)
                    warehouse.bottles.bottles_quantity += req.body.quantity

                    await warehouseModel.updateOne({}, warehouse)

                    res.status(200).json({msg: "New format added to warehouse"});
                } else {
                    res.status(400).json({msg: "Format already present"});
                }
            } else {
                res.status(400).json({msg: "Warehouse not created yet!"});
            }
        } catch(err) {
            res.status(400).json({msg: err.toString()})
        }
    }
];

// PATCH format already present into formats' array
exports.patchFormat = [
    async function patchFormat(req, res) {
        try{
            const warehouseList = await warehouseModel.find()

            if(warehouseList.length !== 0){
                const warehouse = warehouseList[0]

                let i = 0
                let found = false

                while(warehouse.bottles.formats.length > i){
                    if(warehouse.bottles.formats[i].format === req.body.format){
                        found = true
                        break
                    }
                    i += 1
                }

                if(found){
                    warehouse.bottles.bottles_quantity += req.body.quantity
                    warehouse.bottles.formats[i].quantity += req.body.quantity

                    await warehouseModel.updateOne({}, warehouse)

                    res.status(200).json({msg: "Format " + warehouse.bottles.formats[i].format + " updated successfully!"});
                } else {
                    res.status(400).json({msg: "Format not present"});
                }
            } else {
                res.status(400).json({msg: "Warehouse not created yet!"});
            }
        } catch(err) {
            res.status(400).json({msg: err.toString()})
        }
    }
];

exports.updateCaps = [
    async function updateCaps(req, res) {
        try {
            const found = await warehouseModel.find();

            if(!found){
                res.status(400).json({msg: "Warehouse not created yet!"});
            } else {
                await updateQuantity(req, res, found[0], CAPS)
            }
        } catch (err) {
            res.json({msg: err});
        }
    }
];

exports.updateTags = [
    async function updateTags(req, res) {
        try {
            const found = await warehouseModel.find();

            if(!found){
                res.status(400).json({msg: "Warehouse not created yet!"});
            } else {
                await updateQuantity(req, res, found[0], TAGS)
            }
        } catch (err) {
            res.json({msg: err});
        }
    }
];

async function updateQuantity(req, res, warehouse, tag){
    if(req.body.quantity > 0){
        if(tag === CAPS){
            warehouse.caps_quantity += req.body.quantity
        } else if(tag === TAGS){
            warehouse.tags_quantity += req.body.quantity
        }

        await warehouseModel.updateOne({}, warehouse)

        res.status(200).json({msg: tag + " quantity updated successfully!"});
    } else {
        res.status(400).json({msg: "Quantity should be greater than 0"});
    }
}

/*
//UPDATE method
exports.updateWarehouse = [
    async function updateWarehouse(req, res) {
        try {
            const found = await warehouseModel.find();

            if(!found){
                res.status(400).json({msg: "Warehouse not created yet!"});
            } else {
                const warehouse = await insertIntoWarehouse(req, res);

                if(warehouse === null){
                    res.status(400).json({msg: "Quantities should be greater than -1!"});
                } else {
                   await warehouseModel.updateOne(
                        { $set: {

                            bottles: warehouse.bottles,
                            caps_quantity: warehouse.caps_quantity,
                            tags_quantity: warehouse.tags_quantity }
                        });

                    res.status(200).json({msg: "Warehouse updated successfully!"});
                }
            }
        } catch (err) {
            res.json({msg: err});
        }
    }
];
 */
