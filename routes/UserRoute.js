const express = require('express');
const router = express.Router();
const auth = require("../middlewares/Auth")
const userController = require("../controllers/UserController");

router.use(auth);

//TODO da testare le patch

router.get("/users", userController.getAllUsers);
router.get("/user/:username", userController.getOneUser);
router.patch("/user/:username", userController.patchUser);
router.patch("/user/:username", userController.updateRole);
router.delete("/user/:username",userController.deleteUser);
module.exports = router;