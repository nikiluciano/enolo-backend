const url = require("url");
const wineConfermentModel = require("../models/WineConferment");

exports.getStatsSuppierQuantity = [
async function getStatsSupplierQuantity(req, res){
    try {
        const queryUrl = url.parse(req.url, true).query;


        const supplier = queryUrl["supplier"];
        const quantity = queryUrl["quantity"]
        let sort = queryUrl["sort"];

        const filter = {
            supplier: supplier,
            quantity: quantity
        }
        console.log(filter)
        if(sort === undefined){
            sort = -1;
        }

        const conferment = await wineConfermentModel.find(
            filter
        ).select(supplier).exec();
        console.log(conferment)


        res.status(200).json(conferment);

    }catch{
        res.status(400).json({msg: "Couldn't get all wine conferment"});
    }
}];