const express = require('express');
const statisticsController = require("../controllers/StatistiscsController");
const router = express.Router();

router.get("",statisticsController.getStatsSupplierQuantity);

module.exports = router;