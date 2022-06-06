const wineConfermentModel = require("../models/WineConferment");

exports.getStatsSupplierQuantity = [
async function getStatsSupplierQuantity(req, res){
    try {
        const sum = await wineConfermentModel.aggregate([
            {
                $group: {
                    _id: "$supplier",
                    total: {
                        $sum: "$quantity"
                    }
                }
            } ] )
        console.log(sum)

        res.status(200).json(sum);

    }catch{
        res.status(400).json({msg: "Couldn't get all wine conferment"});
    }
}];

exports.getStatsTypologyQuantity = [
    async function getStatsTypologyQuantity(req, res){
        try {
            const sum = await wineConfermentModel.aggregate([
                {
                    $group: {
                        _id: "$typology",
                        total: {
                            $sum: "$quantity"
                        }
                    }
                } ] )
            console.log(sum)

            res.status(200).json(sum);

        }catch{
            res.status(400).json({msg: "Couldn't get all wine conferment"});
        }
    }];

