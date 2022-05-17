const express = require('express');
const router = express.Router();
const auth = require("../middlewares/Auth")
const warehouseController = require("../controllers/WarehouseController");

router.get("", auth, warehouseController.getWarehouse);
router.post("", auth, warehouseController.postWarehouse);
router.patch("", auth, warehouseController.updateWarehouse);

module.exports = router
