const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController');

router.post("/login", loginController.login);
router.post("/refresh-token", loginController.refreshToken);
//router.delete("/logout", loginController.logout);

module.exports = router;
