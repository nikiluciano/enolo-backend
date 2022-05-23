const warehouseModel = require("../models/Warehouse");

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
                   await warehouseModel.update(
                        { $set: {

                            bottles: warehouse.bottles,
                            caps_quantity: warehouse.caps_quantity,
                            tags_quantity: warehouse.tags_quantity}
                        });

                    res.status(200).json({msg: "Warehouse updated successfully!"});
                }
            }
        } catch (err) {
            res.json({msg: err});
        }
    }
]
