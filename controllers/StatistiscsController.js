const wineConfermentModel = require("../models/WineConferment");

// This stat sums every conferment's quantity per supplier
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
                }]);
            res.status(200).json(sum);
        } catch {
            res.status(400).json({msg: "Impossibile completare l'operazione"});
        }
}];

// This stat sums every conferment's quantity per wine's typology
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
                }]);
            res.status(200).json(sum);
        } catch {
            res.status(400).json({msg: "Impossibile completare l'operazione"});
        }
}];

/* This stat returns:
    - total waste of destemming process and wine making process;
    - the sum of destemming waste (total) and wine making waste (total);
    - total quantity of conferments
 */
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
                }]);

            res.status(200).json(waste[0]);

        } catch {
            res.status(400).json({msg: "Errore nell'ottenimento dello scarto o scarto non presente nel conferimento corrente"});
        }
}];
