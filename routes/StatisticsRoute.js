const express = require('express');
const statisticsController = require("../controllers/StatistiscsController");
const router = express.Router();
const auth = require ("../middlewares/Auth");

router.get("/quantity_per_supplier",auth,statisticsController.getStatsSupplierQuantity);
router.get("/quantity_per_typology",auth,statisticsController.getStatsTypologyQuantity);
router.get("/waste_per_quantity",auth,statisticsController.getStatsWaste);

module.exports = router;
