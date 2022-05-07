const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/RegisterUser');

router.post("/signup", async(req,res) => {
    await registerUser(req,res);
});

module.exports = router;
