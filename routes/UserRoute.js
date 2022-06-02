const express = require('express');
const router = express.Router();
const auth = require("../middlewares/Auth")
const userController = require("../controllers/UserController");

router.use(auth);

//TODO da testare le patch

router.get("", userController.getAllUsers);
router.get("/:username", userController.getOneUser);
router.patch("/:username", userController.patchUser);
router.patch("/role/:username", userController.updateRole);
router.delete("/:username",userController.deleteUser);
module.exports = router;