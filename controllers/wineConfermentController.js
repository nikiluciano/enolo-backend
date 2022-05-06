const wineConfermentModel = require("../models/wineConferment");

async function valueAssignement(req, res){
    try{
        req.status = req.body.status
        req.country = req.body.country
        req.supplier = req.body.supplier
        req.description = req.body.description
        req.typology = req.body.typology
        req.origin = req.body.origin
        req._idworker = req.body._idworker
        console.log(req.country);
    }catch (e){
        console.log(e);
        res.status(500).send("Server error");
    }
}

exports.postWineConferment = [
    async function postWineConferment(req, res){
        await valueAssignement(req, res)
        const found = await wineConfermentModel.findOne({}).exec();
        const newWineConferment = new wineConfermentModel({
            status: req.status,
            country: req.country,
            supplier: req.supplier,
            description: req.description,
            typology: req.typology,
            origin: req.origin,
            _idworker: req._idworker
        });

        if(found){
            res.status(409).json({msg: "wine conferment already exist"});
        } else {
            console.log(newWineConferment)
            try {
                await newWineConferment.save();
                res.status(200);
                res.json( {msg:"Wine Conferment inserted"} );
            } catch (err) {
                console.log(newWineConferment)
                res.status(400);
                res.json( {msg:err.toString()} );
            }
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
