const express = require('express');
const router = express.Router();
const auth = require("../middlewares/Auth")
const authController = require('../controllers/AuthController');

router.post("/login", authController.login);
router.post("/refresh_token", authController.refreshToken);
router.delete("/logout", authController.logout);
//router.delete("/logout", auth, authController.logout);

module.exports = router;
