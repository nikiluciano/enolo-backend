const express = require('express');
const statisticsController = require("../controllers/StatistiscsController");
const router = express.Router();
const auth = require ("../middlewares/Auth");

router.get("/quantitypersupplier",auth,statisticsController.getStatsSupplierQuantity);
router.get("/quantitypertypology",auth,statisticsController.getStatsTypologyQuantity);
router.get("/wasteperquantity",auth,statisticsController.getStatsWaste);

module.exports = router;