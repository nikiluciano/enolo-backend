const express = require('express');
const statisticsController = require("../controllers/StatistiscsController");
const router = express.Router();
const auth = require ("../middlewares/Auth");

router.get("/quantity-per-supplier",auth,statisticsController.getStatsSupplierQuantity);
router.get("/quantity-per-typology",auth,statisticsController.getStatsTypologyQuantity);
router.get("/waste-per-quantity",auth,statisticsController.getStatsWaste);

module.exports = router;
