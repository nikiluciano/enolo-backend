const wineConfermentModel = require("../models/WineConferment");

exports.getStatsSupplierQuantity = [
    async function getStatsSupplierQuantity(req, res) {
        try {
            const sum = await wineConfermentModel.aggregate([
                {
                    $group: {
                        _id: "$supplier",
                        total: {
                            $sum: "$quantity"
                        }
                    }
                }])
            res.status(200).json(sum);
        } catch {
            res.status(400).json({msg: "Couldn't get all wine conferment"});
        }
}];

exports.getStatsTypologyQuantity = [
    async function getStatsTypologyQuantity(req, res) {
        try {
            const sum = await wineConfermentModel.aggregate([
                {
                    $group: {
                        _id: "$typology",
                        total: {
                            $sum: "$quantity"
                        }
                    }
                }])
            res.status(200).json(sum);
        } catch {
            res.status(400).json({msg: "Couldn't get all wine conferment"});
        }
}];

exports.getStatsWaste = [
    async function getStatsWaste(req, res) {
        try {
            const waste = await wineConfermentModel.aggregate([
                {
                    $group: {
                        _id: "$unset",
                        destemmingWaste: {
                            $sum: "$destemming_process.waste"
                        },
                        winemakingWaste: {
                            $sum: "$winemaking_process.waste"
                        },
                        totalQuantity: {
                            $sum: "$quantity"
                        },
                       totalWaste: { $sum : {$add: [{$ifNull:['$destemming_process.waste', 0]},{$ifNull:['$winemaking_process.waste', 0]} ]} }
                    }
                }])

            res.status(200).json(waste[0]);

        } catch {
            res.status(400).json({msg: "Couldn't get waste"});
        }
}];
