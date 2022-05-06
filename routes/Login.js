const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController');

router.post("/login", async(req,res) => {
    await loginController(req,res);
});

module.exports = router;
