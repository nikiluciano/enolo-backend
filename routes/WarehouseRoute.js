const express = require('express');
const router = express.Router();
const auth = require("../middlewares/Auth")
const warehouseController = require("../controllers/WarehouseController");

router.get("", auth, warehouseController.getWarehouse);
router.post("", auth, warehouseController.postWarehouse);
router.patch("/format", auth, warehouseController.addFormat);
router.patch("/update_format", auth, warehouseController.patchFormat);
//router.patch("/update_caps", auth, warehouseController.updateCaps);
router.patch("/update_caps", auth, warehouseController.updateCaps);
router.patch("/update_tags", auth, warehouseController.updateTags);

module.exports = router
