const userModel = require("../models/User")

exports.getAllUsers = [
    async function getAllUsers(req, res) {
        try {
            const users = await userModel.find()

            users.forEach( user => user["password"] = undefined);

            res.status(200).json(users);
        } catch (err) {
            res.status(400).json({msg: "Impossibile ottenere tutti gli utenti"})
        }
    }];

exports.getOneUser = [
    async function getOneUser(req, res) {
        try {
            const found = await userModel.findOne({username: req.params.username});

            if (!found) {
                res.status(404).json({msg: "Non ci sono utenti con questo nome utente"});
            } else {
                found["password"] = undefined

                console.log(found);

                res.status(200).json(found);
            }
        } catch (err) {
            res.status(400).json({msg: "Nome utente sbagliato"});
        }
    }];

exports.updateRole = [
    async function updateRole(req, res) {
        try{
            const found = await userModel.findOne({username: req.body.username});

            if (!found) {
                res.status(404).json({msg: "Non ci sono utenti con questo nome utente"});
            } else {

                if(req.body.role === "WORKER" || req.body.role === "ADMIN") {

                    if (req.body.role === found.role) {
                        res.status(400).json({msg: "Questo utente è già " + req.body.role});
                        return
                    }

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
                    return
                }
            }
        } catch (err) {
            res.status(400).json({msg:err.toString() });
        }
}];

exports.patchUser = [
    async function patchUser(req, res) {

        try{
            const found = await userModel.findOne({username: req.params.username});

            if(!found){
                res.status(404).json({msg: "Non ci sono utenti con questo nome utente"});
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

                res.status(200).json({msg: "Utent aggiornato con successo"});
            }
        } catch (err) {
            res.status(400).json({msg:err.toString() });
        }
}];

exports.deleteUser = [
    async function deleteUser(req, res) {
    try {
        const found = await userModel.findOne({username: req.body.username});
        const loggedUser = await userModel.findOne({username: req.params.username});

        if (!found) {
            res.status(404).json({msg: "Non ci sono utenti con questo nome utente"});
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
