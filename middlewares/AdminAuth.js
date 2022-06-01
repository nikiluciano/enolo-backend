const user = require("../models/User");

async function verifyAdmin  (req, res, next)  {
    const found = await user.findOne({username:req.user.username}).exec();

    if(found.role !== "ADMIN"){
        console.log(found);
        return res.status(401).json({ msg: 'Unauthorized' });
    }
    next();
}

module.exports = verifyAdmin;