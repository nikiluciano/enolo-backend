const express = require('express');
const statisticsController = require("../controllers/StatistiscsController");
const router = express.Router();

router.get("",statisticsController.getStatsSuppierQuantity);

module.exports = router;