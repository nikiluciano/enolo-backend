const user = require("../models/User");

async function verifyAdmin  (req, res, next)  {
    const found = await user.findOne({username: req.params.username}).exec();

    if(!found) {
        res.status(404).json({ msg: 'Logged user not found'});
        return
    }

    if(found.role !== "ADMIN"){
        console.log(found);
        return res.status(401).json({ msg: 'You don\'t have permission for this operation' });
    }

    next();
}

module.exports = verifyAdmin;
