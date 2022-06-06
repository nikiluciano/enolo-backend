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
            console.log(sum)

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
            console.log(sum)

            res.status(200).json(sum);

        } catch {
            res.status(400).json({msg: "Couldn't get all wine conferment"});
        }
    }];

exports.getStatsWaste = [
    async function getStatsWaste(req, res) {
    console.log("Entra")
        try { //wineMaking, destemming
            const waste = await wineConfermentModel.aggregate([
                {
                   $group: {
                        _id: "$unset",
                        wineMakingWaste: {
                            $sum: "$winemaking_process.waste"
                        },
                        destemmingWaste: {
                            $sum: "$destemming_process.waste"
                        },
                        totalQuantity: {
                            $sum: "$quantity"
                        },
                        totalWaste: { $sum : {$add: ['$winemaking_process.waste', '$destemming_process.waste']} }
                   },
               /*     $project:{
                       totalWaste:{
                           $add: { wineMakingWaste: {
                                   $sum: "$winemaking_process.waste"
                               },
                               destemmingWaste: {
                                   $sum: "$destemming_process.waste"
                               } }
                       }
                    }*/
                }])
        //    waste.totalWaste = waste.destemmingWaste + waste.wineMakingWaste
            console.log(waste);

            res.status(200).json(waste);

        } catch {
            res.status(400).json({msg: "Couldn't get waste"});
        }
    }];
