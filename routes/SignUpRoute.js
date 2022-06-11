const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/SignUpController');

router.post("/signup", registerUser.signup);

module.exports = router;
