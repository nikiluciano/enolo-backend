const wineConfermentModel = require("../models/WineConferment");

//Assign value to models fields
async function valueAssignement(req, res, date) {
    const wineConferment = new wineConfermentModel()

    try {
        wineConferment.country = req.body.country
        wineConferment.supplier = req.body.supplier
        wineConferment.description = req.body.description
        wineConferment.typology = req.body.typology
        wineConferment.origin = req.body.origin
        wineConferment._idworker = req.body._idworker
        wineConferment.date = date

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
        res.status(500).send("Server error");
    }
}

//Post method
exports.postWineConferment = [
    async function postWineConferment(req, res) {

        //Define date to insert it automatically into db
        let dateNowObj = new Date();
        let date = ("0" + dateNowObj.getDate()).slice(-2);
        let month = ("0" + (dateNowObj.getMonth() + 1)).slice(-2);
        let year = dateNowObj.getFullYear();
        let hours = dateNowObj.getHours();
        let minutes = dateNowObj.getMinutes();
        let seconds = dateNowObj.getSeconds();
        //format GG/MM/AA - HH/MM/SS
        dateNowObj = (date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds);

        const newWineConferment = await valueAssignement(req, res, dateNowObj)

        try {
            await newWineConferment.save();
            res.status(200);
            res.json({msg: "Wine Conferment inserted"});
        } catch (err) {
            console.log(newWineConferment)
            res.status(400);
            res.json({msg: err.toString()});
        }
}];

exports.getOneWineConferment = [
    async function getOneSuppliers(req, res) {
        try{
            const _idReq = req.params.id;
            const found = await wineConfermentModel.findById(_idReq);

            if(!found){
                res.status(400).json({msg: "There is no wine conferment with this id"});
            } else {
                res.status(200);
                res.json(found);
            }
        } catch (err) {
            res.json({msg: "Incorrect id"});
        }
}];
