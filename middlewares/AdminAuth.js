const user = require("../models/User");

async function verifyAdmin  (req, res, next)  {
    const found = await user.findOne({username: req.params.username}).exec();

    if(!found) {
        res.status(404).json({ msg: 'Utente loggato non trovato'});
        return
    }

    if(found.role !== "ADMIN"){
        console.log(found);
        return res.status(401).json({ msg: 'Non hai il permesso per completare l\'operazione' });
    }

    next();
}

module.exports = verifyAdmin;
