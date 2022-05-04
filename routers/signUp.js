const express = require('express');
const router = express.Router();
const user = require('../models/user');
const registration = require('../controllers/registerUser');

router.post("/signup",registration.registerUser);

router.get("/confirmation/:username/:token", registration.emailConfirmation);

module.exports = router;