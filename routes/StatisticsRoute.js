const express = require('express');
const statisticsController = require("../controllers/StatistiscsController");
const router = express.Router();
const auth = require ("../middlewares/Auth");

router.get("/quantitypersupplier",statisticsController.getStatsSupplierQuantity);
router.get("/quantitypertypology",statisticsController.getStatsTypologyQuantity);
router.get("/wasteperquantity",statisticsController.getStatsWaste);

module.exports = router;