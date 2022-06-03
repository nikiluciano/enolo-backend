const express = require('express');
const router = express.Router();
const auth = require("../middlewares/Auth")
const warehouseController = require("../controllers/WarehouseController");

router.get("", auth, warehouseController.getWarehouse);
router.post("", auth, warehouseController.postWarehouse);
router.patch("/format", auth, warehouseController.addFormat);
router.patch("/updateFormat", auth, warehouseController.patchFormat);
router.patch("/updateCaps", auth, warehouseController.updateCaps);
router.patch("/updateCaps", auth, warehouseController.updateCaps);
router.patch("/updateTags", auth, warehouseController.updateTags);

module.exports = router
