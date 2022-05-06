const wineConfermentModel = require("../models/wineConferment");
async function valueAssignement(req, res){
    try{
        req.status = req.body.status.replace(/ /g, '');
        req.country = req.body.country.replace(/ /g, '');
        req.supplier = req.body.supplier.replace(/ /g, '');
        req.description = req.body.description.replace(/ /g, '');
        req.typology = req.body.typology.replace(/ /g, '');
        req.origin = req.body.origin.replace(/ /g, '');
        req._idworker = req.body._idworker.replace(/ /g, '');
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
        if(found ){
            res.status(409).json({msg: "wine conferment already exist"});
        }else {
            console.log(newWineConferment)
            try {
                await newWineConferment.save();
                res.status(200);
                res.json("Wine Conferment insered");
            } catch (err) {
                console.log(newWineConferment)
                res.status(400);
                res.json({msg:"e"});
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
            res.json("Couldn't get wine conferment");
        } else {
            res.status(200);
            res.json(found);
        }
    }];
