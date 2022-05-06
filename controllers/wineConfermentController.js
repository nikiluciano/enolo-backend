const wineConfermentModel = require("../models/wineConferment");
//Assign value to models fields
async function valueAssignement(req, res){
    try{
        req.status = req.body.status
        req.country = req.body.country
        req.supplier = req.body.supplier
        req.description = req.body.description
        req.typology = req.body.typology
        req.origin = req.body.origin
        req._idworker = req.body._idworker
    }catch (e){
        res.status(500).send("Server error");
    }
}
//Post method
exports.postWineConferment = [
    async function postWineConferment(req, res){
        await valueAssignement(req, res)
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

        const newWineConferment = new wineConfermentModel({
            status: req.status,
            country: req.country,
            supplier: req.supplier,
            description: req.description,
            typology: req.typology,
            origin: req.origin,
            date: dateNowObj,
            _idworker: req._idworker
        });
            try {
                await newWineConferment.save();
                res.status(200);
                res.json( {msg:"Wine Conferment inserted"} );
            } catch (err) {
                console.log(newWineConferment)
                res.status(400);
                res.json( {msg:err.toString()} );
            }
}];

exports.getOneWineConferment = [
    async function getOneSuppliers(req,res){
        const _idReq = req.params.id;
        console.log(_idReq);
        const found = await wineConfermentModel.findOne({id:_idReq}).exec();
        if (!found) {
            res.status(400);
            console.log(found);
            res.json( {msg:"Couldn't get wine conferment"} );
        } else {
            res.status(200);
            res.json(found);
        }
}];
