const user = require("../Models/user");

module.exports = async function emailConfirmation(req, res) {
    const tok = req.params.token;
    const found = await user.findOne({token: tok}).exec();

    if (!found) {
        res.status(409); //TODO da definire
        res.json("ERROR " + res.statusCode + " An Error was occured during email confirmation");
    }
    found.status = "ACTIVE";
    try {
        await found.save();
    } catch (err) {
        res.status(400);
        res.json({msg: err});
    }

}