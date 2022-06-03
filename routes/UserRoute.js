const express = require('express');
const router = express.Router();
const auth = require("../middlewares/Auth");
const admin= require("../middlewares/AdminAuth");
const userController = require("../controllers/UserController");

router.get("", auth, userController.getAllUsers);
router.get("/:username", auth, userController.getOneUser); // "username" in patch is not logged user
router.patch("/:username", userController.patchUser); // "username" in patch is not logged user
router.patch("/role/:username", auth, admin, userController.updateRole); // "username" in patch is logged user
router.delete("/:username", auth, admin, userController.deleteUser); // "username" in path is logged user

module.exports = router;
