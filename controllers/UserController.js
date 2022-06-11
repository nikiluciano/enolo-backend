const userModel = require("../models/User")

//GET all users
exports.getAllUsers = [
    async function getAllUsers(req, res) {
        try {
            const users = await userModel.find()

            /*
               exclude password field for every user:
               client won't see the encrypted password in json response, because he doesn't need it
             */
            users.forEach( user => user["password"] = undefined);

            res.status(200).json(users);
        } catch (err) {
            res.status(400).json({msg: "Impossibile ottenere tutti gli utenti"})
        }
}];

//GET one user by username
exports.getOneUser = [
    async function getOneUser(req, res) {
        try {
            const found = await userModel.findOne({username: req.params.username});

            if (!found) {
                res.status(404).json({msg: "Non ci sono utenti con questo username"});
            } else {
                // password excluded also here
                found["password"] = undefined

                res.status(200).json(found);
            }
        } catch (err) {
            res.status(400).json({msg: "Username errato"});
        }
}];

// UPDATE user role - it can be updated by an ADMIN user
exports.updateRole = [
    async function updateRole(req, res) {
        try{

            // find by username
            const found = await userModel.findOne({username: req.body.username});

            if (!found) {
                res.status(404).json({msg: "Non ci sono utenti con questo username"});
            } else {

                if(req.body.role === "WORKER" || req.body.role === "ADMIN") {

                    if (req.body.role === found.role) {
                        res.status(400).json({msg: "Questo utente è già " + req.body.role});
                        return
                    }

                    // update by username
                    await userModel.updateOne(
                        {username: req.body.username},
                        {
                            $set: {
                                role: req.body.role,
                            }
                        });

                    res.status(200).json({msg: "Ruolo cambiato con successo"});
                } else {
                    res.status(400).json( {msg: "Ruolo non valido"} );
                }
            }
        } catch (err) {
            res.status(400).json({msg:err.toString() });
        }
}];

// UPDATE user
exports.patchUser = [
    async function patchUser(req, res) {

        try{
            const found = await userModel.findOne({username: req.params.username});

            if(!found){
                res.status(404).json({msg: "Non ci sono utenti con questo username"});
            } else {

                await userModel.updateOne(
                    {username: req.params.username},
                    {
                        $set: {
                            email: req.body.email,
                            name: req.body.name,
                            surname: req.body.surname,
                            phone: req.body.phone,
                            address: req.body.address
                        }
                    });

                res.status(200).json({msg: "Utente aggiornato con successo"});
            }
        } catch (err) {
            res.status(400).json({msg:err.toString() });
        }
}];

//DELETE user
exports.deleteUser = [
    async function deleteUser(req, res) {
    try {
        const found = await userModel.findOne({username: req.body.username});
        const loggedUser = await userModel.findOne({username: req.params.username});

        if (!found) {
            res.status(404).json({msg: "Non ci sono utenti con questo username"});
        } else {
            if (found.username === loggedUser.username) {
                res.status(400).json({msg: "Non puoi cancellare il tuo stesso account"});
                return
            }

            await userModel.deleteOne({username: found.username})

            res.status(200).json({msg: "Utente eliminato con successo"});
        }
    } catch  (err) {
        res.status(400).json({msg:err.toString() });
    }
}];
